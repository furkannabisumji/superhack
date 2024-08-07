import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const proof = req.body
    const app_id ="app_staging_a16f3f6d0fc113a7bf1c2f31a20c3020"
    const action = "hack"
	const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse

    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        res.status(200).send(verifyRes);
        console.log(verifyRes.body)
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        res.status(400).send(verifyRes);
    }
};
