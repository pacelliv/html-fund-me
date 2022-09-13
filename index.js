import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectBtn = document.getElementById("connect-btn")
const fundBtn = document.getElementById("fund-btn")

connectBtn.onclick = connect
fundBtn.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectBtn.innerHTML = "Connected!"
    } else {
        connectBtn.innerHTML = "Please install Metamask!"
    }
}

async function fund() {
    const ethAmount = "100"
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        //I need a provider / conection to the blockchain
        // signer / wallet / someone with gas
        // contract to interact with (address and ABI)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//fund

//withdraw
