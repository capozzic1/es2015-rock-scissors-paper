if (counter == 2){
  let idx;
  let choice;

    for (let i = 0; i < imgs.length; i++){
      idx = imgs[i].indexOf(input);
      console.log(idx);
      if (idx != -1) {
          choice = imgs[i];
          img.src = choice;
          clearInterval(animInterval);
          break;
      }
    }

    //img.src = choice;

}
