<template>

  <div class="grid 
   md:grid-cols-2">

  <div class="text-sm space-y-4 p-2">
   <h1 class="brand text-5xl underline">
    Ink UI
   </h1>
   <p class="text-base md:text-xl 
    font-roboto text-gray-600">
    INk Ui is a real-time data sync note takings web-app
    build with vue js. If you found this project 
    interesting , I hope you would also like some of my 
    other projects if so check out my 

    <a href="https://sosring-portfolio.web.app/"
     class="font-bold text-indigo-600">
      porfolio.
    </a>
   </p>
  </div>

  <div class="hidden md:flex justify-end">
   <img src="../../faviWBg.png"
    class="h-40 w-40 md:h-80 md:w-96
    rounded-md object-cover" 
    :blur="30" />
  </div>

 </div>

</template>
