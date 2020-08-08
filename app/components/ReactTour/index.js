import React from "react";
import Tour from "reactour";

export const steps = [{
  selector:'[data-tut="tut-navigasi"]',
  content:'ini adalah Tab menu navigasi'
},{
  selector:'[data-tut="tut-pengajuan"]',
  content:'menu cepat untuk mengakses layanan AFS seperti pengajuan, informasi, dll. usap jari untuk berpindah menu dan klik tombol untuk mengakses layanan '
},{
  selector:'[data-tut="tut-notif"]',
  content:'ikon notifikasi digunakan untuk melihat pemberitahuan singkat selama menggunakan aplikasi'
},{
  selector:'[data-tut="tut-setting"]',
  content:'klik disini untuk melihat dan merubah pengaturan'
}];

const ReactTour = props => {
  // console.log(props);    
  return (
    <Tour 
      steps={steps} 
      isOpen={props.isOpen}       
      showNavigation={true}
      showButtons={true}
      closeWithMask={false}
      showCloseButton={true}
      {...props} />
  );
}

export default ReactTour;