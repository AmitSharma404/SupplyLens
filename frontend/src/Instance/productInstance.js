

export const getProducts = async () => {
    try {
        const response = await fetch('/api/products/getproducts', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data.products; // Assuming the API returns an object with a 'products' array
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await fetch('/api/products/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const data = await response.json();
        return data.product; // Assuming the API returns an object with the added product
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};