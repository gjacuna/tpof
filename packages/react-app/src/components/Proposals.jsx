import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, List, Row, Input, Typography } from "antd";
import { CaretUpOutlined, CaretDownOutlined, QuestionOutlined } from "@ant-design/icons";
import { useContractReader } from "eth-hooks";

import { useEventListener } from "eth-hooks/events/useEventListener";

const { ethers } = require("ethers");
const { Paragraph } = Typography;

export default function Proposals({ address, readContracts, localProvider, writeContracts, tx, loadWeb3Modal }) {
  const discoverAddress = readContracts && readContracts.Discover && readContracts.Discover.address;

  const [tokenAmount, setTokenAmount] = useState();
  const [proposalId, setProposalId] = useState();
  const [downVoteCost, setDownVoteCost] = useState();
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const [upVoting, setUpVoting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [proposals, setProposals] = useState();

  const vendorApproval = useContractReader(readContracts, "SheetToken", "allowance", [address, discoverAddress]);
  const events = useEventListener(readContracts, "Discover", "OrientationCreated", localProvider, 1);

  const showVoteModal = type => {
    setVoteModalVisible(true);
  };

  const handleVoteModalOk = () => {
    setVoteModalVisible(false);
    executeVote();
  };

  const handleVoteModalCancel = () => {
    setVoteModalVisible(false);
  };

  const executeVote = async () => {
    if (writeContracts && writeContracts.Discover && writeContracts.SheetToken) {
      let approveTx;
      if (vendorApproval.lt(upVoting ? tokenAmount : downVoteCost)) {
        approveTx = await tx(
          writeContracts.SheetToken.approve(
            discoverAddress,
            ethers.utils.parseEther(upVoting ? tokenAmount : downVoteCost + ""),
          ),
        );
      }

      let voteTx = upVoting
        ? tx(writeContracts.Discover.upvote(proposalId, ethers.utils.parseEther(tokenAmount)))
        : tx(writeContracts.Discover.downvote(proposalId, ethers.utils.parseEther(downVoteCost + "")));

      if (approveTx) {
        console.log("waiting on approve to finish...");
        let approveTxResult = await approveTx;
        console.log("approveTxResult:", approveTxResult);
      }
      let voteTxResult = await voteTx;
      console.log("swapTxResult:", voteTxResult);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const updateProposals = () => {
      const proposalUpdate = [];
      if (events && readContracts.Discover) {
        events.forEach(async event => {
          try {
            const index = await readContracts.Discover.id2index(event.args[0]);
            const proposal = await readContracts.Discover.orientations(index);
            const { b, c, vR } = await readContracts.Discover.downvoteCost(event.args[0]);
            proposalUpdate.push({
              id: event.args[0],
              index: index,
              metadata: proposal.metadata,
              staked: parseInt(proposal.effectiveBalance, 10),
              downVoteCost: parseInt(c, 10),
              balanceDownBy: parseInt(b, 10),
              votesRequired: parseInt(vR, 10),
            });
            proposalUpdate.sort((a, b) => {
              return b.staked - a.staked;
            });
          } catch (e) {
            console.log(e);
          }
        });
      }
      setProposals(proposalUpdate);
      setIsLoading(false);
    };

    updateProposals();
  }, [events, readContracts.Discover]);

  const voteModal = (
    <Modal
      title={"Confirm " + (upVoting ? "UpVote" : "DownVote")}
      visible={voteModalVisible}
      onOk={handleVoteModalOk}
      onCancel={handleVoteModalCancel}
    >
      You are {upVoting ? "UpVoting" : "DownVoting"} this Orientation. Are you sure?
      <br />
      {upVoting ? (
        <Input
          style={{ textAlign: "center" }}
          placeholder={"amount of tokens to stake"}
          value={tokenAmount}
          onChange={e => {
            setTokenAmount(e.target.value);
          }}
        ></Input>
      ) : (
        `Cost to DownVote is  
          ${downVoteCost}
          SHEET.`
      )}
      <br />
      Confirming will prompt an approval and then a transfer method on your wallet.
    </Modal>
  );

  return (
    <>
      <Row justify="center" style={{ marginBottom: "5rem" }}>
        <Col xl={13} xs={22}>
          <h2>Orientations</h2>
          <Paragraph style={{ fontSize: 15, lineHeight: "2.5rem" }}>
            Upvote an orientation. Tokens will be staked towards the proposal. The more staked, the higher the rank.
            <br />
            But, the more Tokens an idea has, the cheaper it is, relative to other less funded ideas, to downvote it.
            <br />
            Trolls beware! Downvoting is the same as donating money to the proposer of the idea.
          </Paragraph>
        </Col>
      </Row>
      <div style={{ width: 900, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        <List
          grid={3}
          bordered
          dataSource={proposals}
          renderItem={item => {
            return (
              <List.Item key={item.index}>
                <Card
                  title={
                    <div>
                      <span style={{ fontSize: 16, marginRight: 8 }}>
                        {ethers.utils.parseBytes32String(item.metadata)}
                      </span>
                    </div>
                  }
                  extra={
                    ethers.utils.parseBytes32String(item.metadata) === "over" ? (
                      <img src="./assets/over.png" height={40} width={40} />
                    ) : ethers.utils.parseBytes32String(item.metadata) === "under" ? (
                      <img src="./assets/under.png" height={40} width={40} />
                    ) : ethers.utils.parseBytes32String(item.metadata) === "vertical" ? (
                      <img src="./assets/vertical.png" height={40} width={40} />
                    ) : (
                      <QuestionOutlined />
                    )
                  }
                >
                  Staked: {item.staked}
                  <br />
                  Cost to Down Vote: {item.downVoteCost}
                  <br />
                  <Button
                    onClick={() => {
                      showVoteModal();
                      setUpVoting(true);
                      setProposalId(item.id);
                    }}
                    icon={<CaretUpOutlined />}
                  >
                    UpVote
                  </Button>
                  <Button
                    onClick={() => {
                      showVoteModal();
                      setUpVoting(false);
                      setProposalId(item.id);
                      setDownVoteCost(item.downVoteCost);
                    }}
                    icon={<CaretDownOutlined />}
                  >
                    DownVote
                  </Button>
                </Card>
              </List.Item>
            );
          }}
        />
        {voteModal}
      </div>
    </>
  );
}
