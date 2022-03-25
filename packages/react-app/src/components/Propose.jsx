import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useContractReader } from "eth-hooks";

const { ethers } = require("ethers");

export default function Propose({ address, readContracts, localProvider, writeContracts, tx, loadWeb3Modal }) {
  const discoverAddress = readContracts && readContracts.Discover && readContracts.Discover.address;

  const [isTokenAmountApproved, setIsTokenAmountApproved] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [proposal, setProposal] = useState();

  const vendorApproval = useContractReader(readContracts, "SheetToken", "allowance", [address, discoverAddress]);

  useEffect(() => {
    const tokenAmountAmountBN = tokenAmount && ethers.utils.parseEther("" + tokenAmount);
    setIsTokenAmountApproved(vendorApproval && tokenAmount && vendorApproval.gte(tokenAmountAmountBN));
  }, [tokenAmount, vendorApproval]);

  const [staking, setStaking] = useState();
  const [approving, setApproving] = useState();

  return (
    <>
      <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        <h2>Feeling creative? Propose a new orientation (WITH YOUR WALLET 🤑)</h2>
        {address ? (
          <>
            <Input
              style={{ textAlign: "center" }}
              placeholder={"another orientation? wtf"}
              value={proposal}
              onChange={e => {
                setProposal(e.target.value);
              }}
            />
            <Input
              style={{ textAlign: "center" }}
              placeholder={"amount of tokens to stake"}
              value={tokenAmount}
              onChange={e => {
                setTokenAmount(e.target.value);
              }}
            />
            <Button
              loading={approving}
              onClick={async () => {
                setApproving(true);
                await tx(
                  writeContracts.SheetToken.approve(
                    discoverAddress,
                    tokenAmount && ethers.utils.parseEther(tokenAmount),
                  ),
                );
                setApproving(false);
              }}
              disabled={isTokenAmountApproved ? true : false}
            >
              Approve SHEET
            </Button>
            <Button
              loading={staking}
              onClick={async () => {
                setStaking(true);
                await tx(
                  writeContracts.Discover.createOrientation(
                    ethers.utils.formatBytes32String((address && address.substring(13, 31)) + Date.now()), //just a "random" index is enough for this case
                    ethers.utils.parseEther(tokenAmount),
                    ethers.utils.formatBytes32String(proposal),
                  ),
                );
                setStaking(false);
              }}
              disabled={isTokenAmountApproved && proposal && tokenAmount ? false : true}
            >
              Stake {(tokenAmount * 1).toFixed(2)} SHEET and Create Proposal
            </Button>
          </>
        ) : (
          <Button type={"primary"} onClick={loadWeb3Modal}>
            CONNECT WALLET TO PROPOSE
          </Button>
        )}
      </div>
    </>
  );
}
