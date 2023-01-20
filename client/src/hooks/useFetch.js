import { useEffect, useState } from "react";
import axios from "axios";


//receive two arguments(url and method)
const useFetch = (url,meth) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const listMethod=['POST','GET','PUT','DELETE']
  
  listMethod.forEach(element => {
    if (!meth===element){
      console.log('the method does not exist')
    }
  });



  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios({
          url:url,
          method:meth,
        });
        setData(res.data);

      } catch (err) {

        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url,meth]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;