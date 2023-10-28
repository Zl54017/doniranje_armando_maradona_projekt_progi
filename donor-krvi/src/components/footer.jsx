export default function Footer() {
  return (
    <div>
      <div className='footer'>
      <div className='footer-copyright'>
        <p>
          @{new Date().getFullYear()} Donori krvi. Sva prava podržana.
         </p>
      </div>
      <div className="footer-downs">
      <div className='footer-down'> 
        <a href='/terms'><p>Uvjeti korištenja i pravne napomene</p></a>
        <a href='/privacy'><p>Privatnost</p></a>
        <a href='/cookies'><p>Kolačići</p></a>
      </div>
      <div className='footer-down'> 
      
      <p>Kontakt</p>
      <img  src = '/blood.jpg' />
      </div>
      </div>
      </div>
    </div>
  );
}
