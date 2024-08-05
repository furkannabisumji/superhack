import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import { Dialog, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const SocialConnectUI: React.FC<Props> = ({ isOpen, closeModal }) => {
  const { account, lookupAddress, register, revoke } = useSocialConnect();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [odisRegistedAddresses, setOdisRegistedAddresses] = useState("");

  const { data: session } = useSession();

  const getLookupAddress = useCallback(async () => {
    setLoading(true);
    const addresses = await lookupAddress((session as any)?.username);
    console.log(
      "🚀 ~ file: SocialConnectUI.tsx:22 ~ getLookupAddress ~ addresses:",
      addresses
    );
    setLoading(false);
    if (addresses) {
      setOdisRegistedAddresses(addresses);
    } else {
      setOdisRegistedAddresses("");
    }
  }, [lookupAddress, session]);

  useEffect(() => {
    if (session) {
      getLookupAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Manage Social Connect
                  </Dialog.Title>
                  {loading ? (
                    <div className="w-full flex justify-center items-center mt-5">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    <div className="mt-2">
                      {odisRegistedAddresses ? (
                        <p>
                          You are already registed with Social Connect using
                          following details.
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Your Username is not registered with Social Connect.
                          Please register your username with Social Connect to
                          use it in the app.
                        </p>
                      )}

                      {session && (
                        <div className="text-sm text-gray-500 mt-5">
                          <p>
                            Username:{" "}
                            <span className="text-black font-bold">
                              {(session as any)?.username}
                            </span>
                          </p>
                          <p>
                            Address:{" "}
                            <span className="text-black font-bold">
                              {account?.substring(0, 5)}...
                              {account?.substring(
                                account.length - 5,
                                account.length
                              )}
                            </span>
                          </p>
                          <p>
                            Provider:{" "}
                            <span className="text-black font-bold">
                              {process.env
                                .NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER ===
                                "GITHUB" && "Github"}
                            </span>
                          </p>
                        </div>
                      )}
                      {session && odisRegistedAddresses === "" && (
                        <>
                          <button
                            type="button"
                            disabled={btnLoading}
                            onClick={async () => {
                              setBtnLoading(true);
                              await register((session as any)?.username);
                              setTimeout(async () => {
                                await getLookupAddress();
                                setBtnLoading(false);
                              }, 1000);
                            }}
                            className={`mt-3 text-white ${
                              btnLoading ? "bg-gray-700" : "bg-black"
                            }  hover:bg-gray-600 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2`}
                          >
                            {btnLoading ? "Loading..." : "Register Username"}
                          </button>
                        </>
                      )}
                      {session && odisRegistedAddresses !== "" && (
                        <>
                          <button
                            type="button"
                            disabled={btnLoading}
                            onClick={async () => {
                              setBtnLoading(true);
                              await revoke((session as any)?.username);
                              setTimeout(async () => {
                                await getLookupAddress();
                                setBtnLoading(false);
                              }, 1000);
                            }}
                            className={`mt-3 text-white ${
                              btnLoading ? "bg-gray-700" : "bg-black"
                            } hover:bg-gray-600 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2`}
                          >
                            {btnLoading ? "Loading..." : "Revoke Username"}
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  <div className="mt-4 w-full flex justify-between">
                    <button
                      onClick={() => {
                        if (!session) {
                          signIn();
                        } else {
                          signOut();
                        }
                      }}
                      type="button"
                      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {!session ? "Sign in with Github" : "Sign Out"}
                    </button>
                    <button
                      type="button"
                      className="font-bold inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default SocialConnectUI;
