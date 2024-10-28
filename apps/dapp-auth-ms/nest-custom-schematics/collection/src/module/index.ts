/* eslint-disable @typescript-eslint/no-unused-vars */
import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

function addModuleToAppModule(options: any): Rule {
  return (host: Tree) => {
    const modulePath = 'src/app.module.ts';
    const text = host.read(modulePath);

    if (!text) {
      throw new SchematicsException(`El archivo ${modulePath} no existe.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = ts.createSourceFile(
      modulePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
    );

    const moduleName = `${strings.classify(options.name)}Module`;
    const importPath = `./modules/${strings.dasherize(options.name)}/infrastructure/${strings.dasherize(options.name)}.module`;

    const importChange = insertImport(
      sourceFile,
      modulePath,
      moduleName,
      importPath,
    ) as InsertChange;

    if (importChange) {
      const recorder = host.beginUpdate(modulePath);
      recorder.insertLeft(importChange.pos, importChange.toAdd);
      host.commitUpdate(recorder);
    } else {
      throw new SchematicsException(
        `No se pudo generar la importación para ${moduleName}.`,
      );
    }
    const updatedText = host.read(modulePath)!.toString('utf-8');
    const updatedSourceFile = ts.createSourceFile(
      modulePath,
      updatedText,
      ts.ScriptTarget.Latest,
      true,
    );

    const moduleDecorator = findModuleDecorator(updatedSourceFile);
    if (!moduleDecorator) {
      throw new SchematicsException(
        `No se encontró el decorador @Module en ${modulePath}.`,
      );
    }

    const importsArray = getDecoratorPropertyInitializer(
      moduleDecorator,
      'imports',
    );
    if (!importsArray) {
      throw new SchematicsException(
        `No se encontró el arreglo 'imports' en el decorador @Module de ${modulePath}.`,
      );
    }

    const endPosition = importsArray.getEnd() - 1;
    let insertion = '';

    if (
      importsArray.elements.hasTrailingComma ||
      importsArray.elements.length === 0
    ) {
      insertion = `  ${moduleName},\n`;
    } else {
      insertion = `,\n  ${moduleName}\n`;
    }

    const recorder = host.beginUpdate(modulePath);
    recorder.insertLeft(endPosition, insertion);
    host.commitUpdate(recorder);

    return host;
  };
}

function findModuleDecorator(
  sourceFile: ts.SourceFile,
): ts.ObjectLiteralExpression | null {
  const statements = sourceFile.statements.filter(ts.isClassDeclaration);

  for (const stmt of statements) {
    if (ts.canHaveDecorators(stmt)) {
      const decorators = ts.getDecorators(stmt);
      if (decorators) {
        for (const decorator of decorators) {
          if (ts.isCallExpression(decorator.expression)) {
            const expr = decorator.expression;
            if (
              ts.isIdentifier(expr.expression) &&
              expr.expression.text === 'Module'
            ) {
              const [arg] = expr.arguments;
              if (ts.isObjectLiteralExpression(arg)) {
                return arg;
              }
            }
          }
        }
      }
    }
  }

  return null;
}

function getDecoratorPropertyInitializer(
  expression: ts.ObjectLiteralExpression,
  propertyName: string,
): ts.ArrayLiteralExpression | null {
  const property = expression.properties.find(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === propertyName,
  ) as ts.PropertyAssignment | undefined;

  if (property && ts.isArrayLiteralExpression(property.initializer)) {
    return property.initializer;
  }

  return null;
}

export function module(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      move(`src/modules`),
    ]);

    return chain([mergeWith(templateSource), addModuleToAppModule(options)]);
  };
}
