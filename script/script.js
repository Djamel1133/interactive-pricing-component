document.addEventListener('DOMContentLoaded', function() {
    const pageviewsNumber = document.getElementById('Pageviews_Number');
    const price = document.getElementById('price');
  
    const progressBar = document.getElementById('card__progress-bar');
    const slider = document.getElementById('icon-slider');
    const progressContainer = document.getElementById('card__progress');
    const yearlyBilling =  document.getElementById('Billing-toggle');

    let isYearlyBilling = false ; // by default monthly billing
    let isProgressing   = false;

    let pageNumber = 100 ;
    let cost = 16 ;

    //ensure that the width have a value (50%)
    if (!progressBar.style.width) {
        progressBar.style.width = '50%'; 
    }

    yearlyBilling.addEventListener('click',()=> {
        isYearlyBilling = !(isYearlyBilling) ;
        updateValues();
    },
    );
        
    slider.addEventListener('mousedown', (e) => {
        isProgressing = true;
        slider.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isProgressing) {
            // Get container dimensions
            const rect = progressContainer.getBoundingClientRect();
            // Calculate the new position of the slider
            let offsetX = e.clientX - rect.left;
            offsetX = Math.max(0, Math.min(offsetX, rect.width-48)); // Keep within bounds // 48px width of slider
            // Update the slider position
            slider.style.left = `${offsetX}px`;
            // Update the progress bar width
            const progressPercentage = (offsetX / rect.width) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    });
    
    document.addEventListener('mouseup', () => {
         if (isProgressing) {
            isProgressing = false;
            updateValues(); 
            slider.style.cursor = 'grab'; }
    });

    function updateValues() {
      pageNumber = (Math.round(parseFloat(progressBar.style.width)/10)*20)  ;
      cost = pageNumber *16/100 ;
      if (isYearlyBilling) { cost = Math.round(cost*0.75)} ;
      pageviewsNumber.innerHTML = pageNumber +"k Pageviews"  ;
      price.innerHTML=cost;
    }

    // how deal with donwsizing window to match progressbar value and slider position ???
    window.addEventListener('resize', () => {
       // ????? later perhabs or some one qui aura la gentillesse de m'aider merci.
    });

})


