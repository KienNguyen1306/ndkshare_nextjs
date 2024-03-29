import ReactLoading from "react-loading";

function LoadingFetch({type,loading}) {
  return <>{loading && <div className="flex justify-center items-center h-96"><ReactLoading type={type} color="#1d4ed8"/></div>}</>;
}

export default LoadingFetch;
