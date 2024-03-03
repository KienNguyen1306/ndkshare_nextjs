function Comment() {
    return ( <div className="bg-gray-100 w-fullbg-white rounded-lg border p-1 md:p-3 m-1">
    <h3 className="font-semibold p-1">Comment</h3>
   
    <div className="w-full px-3 mb-2 mt-6">
      <textarea
        className=" rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
        name="body"
        placeholder="Comment"
        required=""
        defaultValue={""}
      />
    </div>
    <div className="w-full flex justify-end px-3 my-3">
      <input
        type="submit"
        className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg"
        defaultValue="Post Comment"
      />
    </div>
  </div>
   );
}

export default Comment;