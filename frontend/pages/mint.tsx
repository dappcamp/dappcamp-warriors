import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { useAccount, useConnect } from 'wagmi'

import Header from '../components/Header'

import 'react-toastify/dist/ReactToastify.css'

export default function Mint({}) {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const onMintCompletion = () => {
    toast.success(`🦄 NFT was successfully minted!`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const mintNFT = () => {
    onMintCompletion()
  }

  return (
    <div
      style={{
        backgroundImage: 'radial-gradient(rgb(54 38 38) 0%, #1A202C 100%)',
        backgroundSize: '100% 200%',
        backgroundPosition: '50% 300%',
        minHeight: '100vh',
      }}
    >
      <Header />
      <div className="mt-8">
        <section className="body-font text-gray-600">
          <div
            className="border-1 flex flex-col rounded-lg border-gray-100 p-8 md:w-1/2 lg:w-2/6"
            style={{ margin: 'auto' }}
          >
            <h2 className="title-font mb-5 text-lg font-medium text-white">
              Immortalize your creation
            </h2>
            <button
              className="rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              onClick={() => mintNFT()}
            >
              Mint next item in Collection
            </button>
          </div>
        </section>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  )
}
