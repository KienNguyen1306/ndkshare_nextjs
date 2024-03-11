function LessionItem({ list, handleClicklession }) {
  return (
    <div className="p-3">
      {list.length > 0 ? (
        <>
          {list.map((item, index) => {
            return (
              <p
                key={item.id}
                onClick={() => {
                  handleClicklession(item.id);
                }}
                className="text-gray-600 mb-3 cursor-pointer"
              >
                {item.name}
              </p>
            );
          })}
        </>
      ) : (
        <p  className="text-gray-600 mb-3 cursor-pointer">
          Đang cập nhập
        </p>
      )}
    </div>
  );
}

export default LessionItem;
