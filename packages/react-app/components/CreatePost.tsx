import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  post: string;
  imgUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: string[];
  onCreatePostClick: () => void;
  loading?: boolean;
  className?: string;
};

function CreatePost({
  post,
  likes,
  comments,
  onCreatePostClick,
  imgUrl,
  videoUrl,
  loading,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Modal toggle */}
      <button
        onClick={() => setOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              // transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create post
                    </DialogTitle>
                    <div className="mt-2">
                      <form>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 flex flex-col ">
                              <div className="col-span-full">
                                <label
                                  htmlFor="about"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  post
                                </label>
                                <div className="mt-2 w-full">
                                  <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="cover-photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                  <div className="text-center">
                                    <PhotoIcon
                                      aria-hidden="true"
                                      className="mx-auto h-12 w-12 text-gray-300"
                                    />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="file-upload"
                                          name="file-upload"
                                          type="file"
                                          className="sr-only"
                                        />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex gap-2 sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onCreatePostClick}
                  className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Create
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-500 bg-white  py-1.5 px-5 text-black transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreatePost;
