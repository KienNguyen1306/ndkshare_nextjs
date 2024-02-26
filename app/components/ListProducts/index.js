import ItemMain from "../item";
import './listproduct.css'
function ListProducts({ datas }) {
  return (
    <div className="products colums">
      <div className="body">
        {datas.map((item,index) => {
          return (
            <>
              <ItemMain key={index} item={item} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ListProducts;
