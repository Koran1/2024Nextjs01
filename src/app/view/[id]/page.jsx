import OneList from '@/app/oneList/page';
import axios from 'axios';

async function Page({ params }) {
    const param = await params;
    const id = param.id;

    // 객체 1개가 온다!
    const API_url = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`

    try {
        const response = await axios.get(API_url);
        const onelist = response.data;
        return <OneList onelist={onelist} />

    } catch (error) {
        console.error('Error :', error);
        return <>Error.</>
    }

}

export default Page;