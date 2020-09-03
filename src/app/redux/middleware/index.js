import { applyMiddleware } from "redux";

//import middleware
import thunk from "redux-thunk";
import logger from "./logger";

export default applyMiddleware(thunk, logger);
