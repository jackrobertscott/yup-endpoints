import { IncomingMessage, ServerResponse } from "http"
import * as yup from "yup"

/**
 * Schema definition for file data using Yup.
 * Defines the structure and validation requirements for file data.
 * @property {yup.MixedSchema} body - A yup mixed schema specifying the body must be a Buffer.
 * @property {yup.StringSchema} fileName - A yup string schema specifying the fileName.
 * @property {yup.StringSchema} encoding - A yup string schema specifying the encoding.
 * @property {yup.StringSchema} mimeType - A yup string schema specifying the mimeType.
 */
export const fileDataSchema = yup.object().shape({
  body: yup
    .mixed((input): input is Buffer => input instanceof Buffer)
    .required(),
  fileName: yup.string().required(),
  encoding: yup.string().required(),
  mimeType: yup.string().required(),
})

/**
 * Infer the type from the fileDataSchema.
 */
export type FileData = yup.InferType<typeof fileDataSchema>

/**
 * Type definition for an endpoint handler function using Yup.
 * @template I - Input type that extends yup.Schema
 * @template O - Output type that extends yup.Schema
 * @param {IncomingMessage} request - The incoming HTTP request.
 * @param {ServerResponse} response - The outgoing HTTP response.
 * @param {I} body - The validated request body.
 * @returns {Promise<O>} - The promise of the output type.
 */
export type YupEndpointHandler<I, O> = (
  request: IncomingMessage,
  response: ServerResponse,
  body: I
) => Promise<O>

/**
 * Type definition for an endpoint configuration object using Yup.
 * @template I - Input type that extends yup.Schema
 * @template O - Output type that extends yup.Schema
 * @property {string} path - The path for the endpoint.
 * @property {I} [in] - Optional Yup schema for input validation.
 * @property {O} [out] - Optional Yup schema for output validation.
 * @property {boolean} [hang] - Optional flag to keep the connection open.
 * @property {YupEndpointHandler} handler - The handler function for the endpoint.
 */
export type YupEndpoint<I extends yup.Schema, O extends yup.Schema> = {
  path: string
  in?: I
  out?: O
  hang?: boolean
  handler: YupEndpointHandler<
    I extends yup.Schema ? yup.InferType<I> : unknown,
    O extends yup.Schema ? yup.InferType<O> : unknown
  >
}

/**
 * Function to create a Yup endpoint.
 * @template I - Input type that extends yup.Schema
 * @template O - Output type that extends yup.Schema
 * @param {YupEndpoint<I, O>} data - The endpoint configuration object.
 * @returns {YupEndpoint<I, O>} - The created endpoint.
 */
export function createYupEndpoint<I extends yup.Schema, O extends yup.Schema>(
  data: YupEndpoint<I, O>
): YupEndpoint<I, O> {
  return data
}
