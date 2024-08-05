// Import necessary modules and types
import { SocialConnectIssuer } from "@/SocialConnect";
import { RPC } from "@/SocialConnect/utils";
import { AuthenticationMethod } from "@celo/identity/lib/odis/query";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

// Define the response type for the revoke function
// It can either return a receipt or an error message
export type RegisterResponse =
  | {
      receipt: string;
    }
  | {
      error: string;
    };

// Define the default export function 'revoke' for handling API requests
export default async function revoke(
  req: NextApiRequest, // Incoming API request
  res: NextApiResponse<RegisterResponse> // API response
) {
  // Handle different request methods
  switch (req.method) {
    case "POST":
      // Parse the request body to extract necessary parameters
      let { identifier, account, identifierType } = JSON.parse(req.body);

      // Create a new wallet instance using the private key and JSON RPC provider
      let wallet = new Wallet(
        process.env.ISSUER_PRIVATE_KEY as string,
        new JsonRpcProvider(RPC)
      );

      // Create a new instance of the SocialConnectIssuer
      const issuer = new SocialConnectIssuer(wallet, {
        authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
        rawKey: process.env.DEK_PRIVATE_KEY as string,
      });

      // Deregister (revoke) the on-chain identifier using the issuer instance
      let deregisterResponse: string = await issuer.deregisterOnChainIdentifier(
        identifier,
        identifierType,
        account as string
      );

      // Return the deregistration response with a 200 status code
      return res.status(200).json({ receipt: deregisterResponse });

    default:
      // For unsupported request methods, return a 400 status code with an error message
      return res.status(400).json({
        error: "Method not supported",
      });
  }
}
