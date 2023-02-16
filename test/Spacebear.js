const {expect} = require("chai");
const hre = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers")

describe("Spacebear", function(){

    async function deploySpacebearAndMintTokenFixture(){
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");
        const spacebearInstance = await Spacebear.deploy();
        const [owner, otherAccount] = await ethers.getSigners();
        await spacebearInstance.safeMint(otherAccount.address);
        return {spacebearInstance};
    }


    it("it is possible to mint Token", async() => {
        const {spacebearInstance} = await loadFixture(deploySpacebearAndMintTokenFixture);

        //console.log(otherAccount.address);
        const [owner, otherAccount] = await ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
    });
    it("fails to tranfer tokens from wrong address", async() => {
        const {spacebearInstance} = await loadFixture(deploySpacebearAndMintTokenFixture);

        //console.log(otherAccount.address);
        const [owner, otherAccount, notTheNFTOwner] = await ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
        await expect(spacebearInstance.connect(notTheNFTOwner).transferFrom(otherAccount.address, notTheNFTOwner.address, 0)).to.be.revertedWith("ERC721: caller is not token owner or approved");
    })
})
