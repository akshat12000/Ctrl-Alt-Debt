import React, { useEffect} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    enqueueSnackbar('Daily Login +5 points!!', { variant });
  };
  
  const info = JSON.parse(localStorage.getItem('profile'));
  console.log(info);

  useEffect(()=>{
      if(info&&info.message==="first"){
          handleClickVariant("success");
      }
  },[info]);

  return (
    <div>
    </div>
  );
}


function loginSnack({info}) {
  return(
    <SnackbarProvider maxSnack={3}>
    <MyApp info={info}/>
  </SnackbarProvider>
  )
}

export default loginSnack;
