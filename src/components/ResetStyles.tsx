const resetStyles = `
/* Client-specific Styles */
#outlook a {
  padding: 0;
}

/* Force Outlook to obtain a "view in browser" menu link. */
body {
  width: 100% !important;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  margin: 0;
  padding: 0;
}

/* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
.ExternalClass {
  width: 100%;
}

/* Force Hotmail to display emails at full width */
.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
  line-height: 100%;
}

/* Force Hotmail to display normal line spacing.*/
#backgroundTable {
  margin: 0;
  padding: 0;
  width: 100% !important;
  line-height: 100% !important;
}

img {
  outline: none;
  text-decoration: none;
  border: none;
  -ms-interpolation-mode: bicubic;
}

a img {
  border: none;
  text-decoration: none;
  border: none;
  -ms-interpolation-mode: bicubic;
}

.image_fix {
  display: block;
}

p {
  margin: 0px 0px !important;
}

table td {
  border-collapse: collapse;
}

.removemobile {
  display: none;
}


/*STYLES*/
/*################################################*/
/*IPAD STYLES*/
/*################################################*/
@media only screen and (max-width: 612px) {
  a[href^="tel"], a[href^="sms"] {
    text-decoration: none;
    color: #ffffff;
    /* or whatever your want */
    pointer-events: none;
    cursor: default;
  }

  .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
    text-decoration: default;
    color: #ffffff !important;
    pointer-events: auto;
    cursor: default;
  }

  table[class=devicewidth] {
    width: 100% !important;
    text-align: center !important;
  }

  td[class=devicewidth] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class=devicewidthinner] {
    width: 92% !important;
    text-align: center !important;
    float: none !important;
    margin: auto !important;
  }

  td[class=devicewidthinner] {
    width: 92% !important;
    text-align: center !important;
    float: none !important;
    margin: auto !important;
  }

  table[class=centered] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class=centered] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class="logo"] {
    width: 100% !important;
    float: left;
    text-align: center;
    margin-bottom: 20px;
  }

  td[class="menu"] {
    width: 100% !important;
    float: left;
  }

  table[class=fullspread] {
    width: 100% !important;
    clear: both;
  }

  table[class=fullwidth] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class=fullwidth] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class="aligncenter"] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class="aligncenter"] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class="buttoncenter"] {
    float: none !important;
    text-align: center !important;
    display: inline-block !important;
    clear: both;
  }

  img[class="imageinline"] {
    display: inline !important;
  }

  img[class="fullwidth"] {
    display: inline !important;
    width: 100% !important;
  }

  td[class="paddingtop"] {
    padding-top: 15px !important;
  }

  .buttonleft {
    display: inherit !important;
  }

  .removemobile {
    width: 100% !important;
    display: block;
  }

  table[class="halfwidth"] {
    width: 50% !important;
  }

  table[class="mghide"] {
    display: none !important;
  }

  td[class="mghide"] {
    display: none !important;
  }
}

/*##############################################*/
/*IPHONE STYLES*/
/*##############################################*/
@media only screen and (max-width: 480px) {
  a[href^="tel"], a[href^="sms"] {
    text-decoration: none;
    color: #ffffff;
    /* or whatever your want */
    pointer-events: none;
    cursor: default;
  }

  .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
    text-decoration: default;
    color: #ffffff !important;
    pointer-events: auto;
    cursor: default;
  }

  table[class=devicewidth] {
    width: 100% !important;
    text-align: center !important;
  }

  td[class=devicewidth] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class=devicewidthinner] {
    width: 92% !important;
    text-align: center !important;
    float: none !important;
    margin: auto !important;
  }

  td[class=devicewidthinner] {
    width: 92% !important;
    text-align: center !important;
    float: none !important;
    margin: auto !important;
  }

  table[class=fullspread] {
    width: 100% !important;
    clear: both;
  }

  table[class=fullwidth] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class=fullwidth] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  table[class=centered] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class=centered] {
    width: 100% !important;
    text-align: center !important;
    clear: both;
  }

  td[class="logo"] {
    width: 100% !important;
    float: left;
    text-align: center;
    margin-bottom: 20px;
  }

  td[class="menu"] {
    width: 100% !important;
    float: left;
  }

  td[class="aligncenter"] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class="aligncenter"] {
    width: 100% !important;
    text-align: center !important;
  }

  table[class="buttoncenter"] {
    float: none !important;
    text-align: center !important;
    display: inline-block !important;
    clear: both;
  }

  img[class="imageinline"] {
    display: inline !important;
  }

  img[class="fullwidth"] {
    display: inline !important;
    width: 100% !important;
  }

  td[class="paddingtop"] {
    padding-top: 15px !important;
  }

  .buttonleft {
    display: inherit !important;
  }

  .removemobile {
    width: 100% !important;
    display: block;
  }

  table[class="halfwidth"] {
    width: 50% !important;
  }

  table[class="mghide"] {
    display: none !important;
  }

  td[class="mghide"] {
    display: none !important;
  }
}
`;

export const ResetStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: resetStyles }} />
);
