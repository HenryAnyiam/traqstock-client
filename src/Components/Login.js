import React from 'react'

function Login() {
  return (
    <div class="w-full flex justify-center items-center" id="forms">
    <div class="bg-gradient-to-r from-base-green from-30% to-hover-green shadow-xl rounded-xl h-fit w-72 lg:w-fit">
        <p class="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Sign In To Your Account</p>
        <form method="POST" action="{% url 'main_app:login' %}">
            <div class="m-4 lg:grid lg:grid-cols-3 lg:gap-4">
                <label for="username" class="font-bold font-serif text-hover-gold p-1">Username:</label>
                <input type="text" name="username" id="username" placeholder="Username" class="bg-white border-2 border-hover-gold focus:border-violet-700 rounded-md p-1 w-52 lg:w-80 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3 lg:gap-4">
                <label for="password" class="font-bold font-serif text-hover-gold p-1">Password:</label>
                <input type="password" name="password" id="password" placeholder="Password" class="bg-white border-2 border-hover-gold rounded-md p-1 w-52 lg:w-80 lg:col-span-2" required />
            </div>
            <div class="m-4 flex justify-center">
                <button type="submit" class="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-base-brown">Continue</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login;
