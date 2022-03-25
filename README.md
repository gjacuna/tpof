# 🧻 Toilet Paper Orientation Foundation 2.0

> Time to take the stakes, HIGHER! 🚀

For a long time, we have been voting for our favorite toilet paper orientation (over has been winning) and now the time has come to raise the stakes, literally.

Introducing: Voting with your wallet!

Inspired by [Cryptowanderer's](https://twitter.com/cryptowanderer) [Staking Curve](https://observablehq.com/@andytudhope/embedded-discover), we're launching a way to vote with your money. If you trully believe your way of orienting toilet paper is the correct way, you should be able to stake some tokens on it.

The beauty is with each "vote", with more money towards one proposal, the "down vote" price goes down. Check out Andy's article for a more in-depth description.

# 💸 Economic Design
1. The rankings are determined by who stakes the most SHEET.
2. The more SHEET you stake, the cheaper it is to vote on your Favorite Orientation.
3. There are two kinds of votes: upvotes and downvotes.
4. The SHEET it costs to upvote is locked directly in the contract and simply adds to the Orientations's ranking.
5. The SHEET it costs to downvote is sent directly back to the Toilet Paper Orientation Foundation. The effect it has on the ranking is proportional to how much is already staked on the Orientation (i.e. it costs less to move a well-funded Orientation (ie. Over) further down the rankings than it does to have the same effect on a less well-funded Orientation (ie. Vertical)).
6. This is achieved by virtue of a simplified bonding curve, which takes SHEET in and works with "virtual votes". It does not mint votes as tokens, for reasons listed on the article.

# 📜 Introducing SHEET
A new token, specifically designed to vote on TPOF, as in Toilet Paper SHEET. Will there be a retroactive drop of SHIT? Only time will tell.

🔏 Edit the Discover and Sheet contracts in `packages/hardhat/contracts`. Discover contract is basically the original, brought to Solidity >v0.8.

📝 Edit the frontend `App.jsx` in `packages/react-app/src`. Checkout the Components folder for the `Propose` and `Proposals` components.

The former is to propose new toilet paper orientations (don't know why there would more than 3), the latter is to display a grid of current ideas and up/down vote on them.

# ‼️⛔⛔‼️☢️☣️ START OF WARNING: BEWARE
There are plenty of simplifications in this repo, regarding id's and metadata of the "Orientations". If you wanna build something more sofisticated, I recommend paying close attention to how the front handles these fields.

DAPPS solution was to store the metadata in IPFS and just store a hash to reference that data in the Discover Contract. They also implemented a backend cache to speed up loading, which for this exercives seems a little over doing it.

# ‼️⛔⛔‼️☢️☣️ END OF WARNING

💼 Edit your deployment scripts in `packages/hardhat/deploy`

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork this repo (based on 🏗 scaffold-eth):

```bash
git clone https://github.com/gjacuna/tpof.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd tpof
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🔏 Edit the contracts in `packages/hardhat/contracts`

📝 Edit the frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

# 📚 Documentation for Scafolld-ETH and other resources

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/scaffold-eth/scaffold-eth/branches/active), [open issues](https://github.com/scaffold-eth/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com) (or your [favorite Pikeman](http://acuna.buidlguidl.com/))!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/scaffold-eth/scaffold-eth/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/scaffold-eth/scaffold-eth/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/scaffold-eth/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/scaffold-eth/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/scaffold-eth/scaffold-eth/tree/aave-ape)

# 💌 P.S.

🌍 You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

📣 Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!

### Automated with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)
