import { BadRequestException, ExecutionContext } from "@nestjs/common";
// TODO: Do we want to depend on this or think of something else?
// import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

const getRequest = (context: ExecutionContext) => {
  if (context.getType() === "http") {
    return context.switchToHttp().getRequest();
  }

  // if (context.getType<GqlContextType>() === "graphql") {
  //   const gqlContext = GqlExecutionContext.create(context);
  //   return gqlContext.getContext().req;
  // }

  throw new BadRequestException(
    "Server only accepts HTTP and GraphQL requests.",
  );
};

export default getRequest;
