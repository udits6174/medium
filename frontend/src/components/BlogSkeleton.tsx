import React from "react";

export const BlogSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              <div className="animate-pulse h-8 w-full bg-gray-300 mb-4"></div>
              <div className="animate-pulse h-8 w-2/3 bg-gray-300 mb-4"></div>
              <div className="animate-pulse h-8 w-1/2 bg-gray-300 mb-4"></div>
            </div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div className="pt-4">
              <div className="animate-pulse h-8 w-full bg-gray-300 mb-4"></div>
              <div className="animate-pulse h-8 w-3/4 bg-gray-300 mb-4"></div>
              <div className="animate-pulse h-8 w-2/3 bg-gray-300 mb-4"></div>
              <div className="animate-pulse h-8 w-1/2 bg-gray-300 mb-4"></div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse mr-4"></div>
              </div>
              <div>
                <div className="text-xl font-bold">Anonymous</div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
