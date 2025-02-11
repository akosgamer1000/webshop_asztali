
import  "../style/basic.css";
const Content: React.FC = () => {
    const data = [
      { id: 1, name: "Laptop", category: "Electronics", price: "$999", stock: 25 },
      { id: 2, name: "Smartphone", category: "Electronics", price: "$699", stock: 50 },
      { id: 3, name: "Headphones", category: "Accessories", price: "$199", stock: 100 },
    ];
  
    return (
      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="even:bg-gray-100">
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.price}</td>
                <td className="p-3 border">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  export default Content;