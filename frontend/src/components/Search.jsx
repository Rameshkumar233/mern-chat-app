import { SearchIcon, X } from "lucide-react";

const Search = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className='w-full'>
            <div className='pt-4'>
                <div className='flex w-full'>
                    <label className='relative flex items-center w-full rounded-lg '>
                        <input
                            type='text'
                            className='w-full input input-sm input-primary'
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className='absolute right-2'>
                            {searchQuery ? (
                                <X
                                    onClick={() => setSearchQuery("")}
                                    className='size-5'
                                />
                            ) : (
                                <SearchIcon className='size-5' />
                            )}
                        </button>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Search;
