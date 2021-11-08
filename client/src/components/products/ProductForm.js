import React, { useState, useEffect } from 'react';

function ProductForm(props) {
  const [user, setUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      setUser({
        email: foundUser.email,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
      });
    }
  }, [user.email]);

  return (
    <div>{user.email === 'saidrobley@gmail.com' && <h1>Product Form</h1>}</div>
  );
}

export default ProductForm;
