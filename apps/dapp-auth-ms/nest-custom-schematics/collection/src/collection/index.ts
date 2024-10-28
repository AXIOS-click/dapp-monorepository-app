/* eslint-disable @typescript-eslint/no-unused-vars */
import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';

export function module(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      move(options.name),
    ]);

    return mergeWith(templateSource);
  };
}
