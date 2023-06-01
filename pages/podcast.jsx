import PodcastListing from '@/components/PodcastListing';
import React from 'react'

const podcast = () => {
  return (
    <div>
      <div className="flex justify-between px-4 pt-8">
        <h2 className="font-bold text-2xl">Podcast</h2>
        <div className="flex items-center">
          <button className="bg-purple-800 text-white px-4 py-2 rounded-lg m-2">
        Add Podcast Link
          </button>
          {/* <button className="hover:text-blue-500">
            <FaFileDownload size={30} />
          </button> */}
        </div>
      </div>
      <PodcastListing/>

    </div>
  );
}

export default podcast