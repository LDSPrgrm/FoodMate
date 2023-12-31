import axios from 'axios';

async function processPayment(user_id, products, totalAmount) {
    try {
        const response = await axios.post(
            'http://192.168.108.88/Projects/E-Commerce/src/backend/api/php/client/process_payment.php',
            { 
                user_id: user_id,
                products: products,
                total_amount: totalAmount,
            },
            { 
                headers: { 'Content-Type': 'application/json' } 
            }
        );

        if (response.data.success) {
            console.log(response.data.message);
            await getUpdatedBalance(user_id);
            return true;
        } else {
            console.error(response.data.error);
            return false;
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        return false;
    }
}

async function addOrder(user_id, product_id, quantity) {
    const products = [
        { product_id: product_id, quantity: quantity },
    ];

    try {
        const response = await axios.post(
            'http://192.168.108.88/Projects/E-Commerce/src/backend/api/php/client/insert_order.php',
            { 
                user_id: user_id,
                products: products,
            },
            { 
                headers: { 'Content-Type': 'application/json' } 
            }
        );

        console.log(response.data);
        return response.data.success;
    } catch (error) {
        console.error('Error posting product data:', error);
        return false;
    }
}

async function deductPayment(user_id, totalAmount) {
    try {
        await axios.post(
            'http://192.168.108.88/Projects/E-Commerce/src/backend/api/php/client/deduct_payment.php',
            { 
              user_id: user_id,
              total_amount: totalAmount,
            },
            { 
                headers: { 'Content-Type': 'application/json' } 
            })
            .then(response => {
            })
            .catch($e => {
                console.error($e);
            })
    } catch (error) {
        console.error('Error posting product data:', error);
    }
}

async function getUpdatedBalance(user_id) {
    try {
        await axios.post(
            'http://192.168.108.88/Projects/E-Commerce/src/backend/api/php/client/get_balance.php',
            { 
              user_id: user_id,
            },
            { 
                headers: { 'Content-Type': 'application/json' } 
            })
            .then(response => {
            })
            .catch($e => {
                console.error($e);
            })
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

export { addOrder, deductPayment, getUpdatedBalance};