import Stripe from "stripe";
import { ENV } from "../lib/ENV.js";

const stripe = new Stripe("sk_test_51SbiQ4GSu43GBPLvpR2pQ7z4AEQArRn0o3jR8RvoDBQAn7cB5bUnJB9TCu9jfipyCXHxrFmnd5Des2aWQa6JFNWR008aaJldQH")

export default stripe;
