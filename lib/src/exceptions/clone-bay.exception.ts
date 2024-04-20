import { HttpException } from "@nestjs/common";

/**
 * Library's top-level exception that other custom exceptions should extend.
 *
 * Currently extends Nest's `HttpException` but this could change as it might
 * not be appropriate considering GraphQL.
 *
 * @group Exceptions
 */
export class CloneBayException extends HttpException {}
