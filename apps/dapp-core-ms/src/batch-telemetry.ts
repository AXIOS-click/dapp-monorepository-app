'use strict';

// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Set an internal logger for open telemetry to report any issues to your console/stdout
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
const exporterOptions = {
  url: 'http://jaeger:4317', // grcp
  // url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT +
};

const traceExporter = new OTLPTraceExporter(exporterOptions);

export const consoleSpanExporter = new ConsoleSpanExporter();
// const spanProcessor = new SimpleSpanProcessor(consoleSpanExporter);

export const spanProcessor = new SimpleSpanProcessor(traceExporter);

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [
    // getNodeAutoInstrumentations(),
    new NestInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'CORE-MS',
  }),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;
