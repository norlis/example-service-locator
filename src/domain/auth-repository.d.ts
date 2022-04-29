import Response from "./models/response";
import Request from "./models/request";
import {ExchangeAuthIn, ExchangeAuthOut} from "./models/exchange-auth";

type AuthRepository = {
      (props: Request<ExchangeAuthIn>): Promise<Response<ExchangeAuthOut>>
}