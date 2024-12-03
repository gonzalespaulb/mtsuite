const newScheduleView = (
  date: string,
  designation: string,
  location: string,
  startTime: string,
  url: string
): string => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  data-editor-version="2"
  class="sg-campaigns"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          width: 600px;
          margin: 0 auto;
        }
        table {
          border-collapse: collapse;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      body,
      p,
      div {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }

      .mainContainer {
        text-align: inherit;
        background-color: #fff;
        border: 1px solid #0C3B6F;
        padding-bottom: 32px;
       }

      .brandingContainer {
         background-color: #0C3B6F; text-align: center; padding: 4px 0;
      }

      .scheduleDate {
        font-size: 32px; line-height: 32px; color: #0C3B6F; font-weight: 700;
      }

      .instruction {
      font-size: 24px; line-height: 24px; color: #0C3B6F; font-weight: 600;
      }

      .note {
          font-size: 14px; line-height: 18px; color: #0C3B6F; font-weight: 400;
    }

    .linkStyle {
        font-size: 18px; line-height: 18px; color: #0C3B6F; font-weight: 600; text-decoration: underline;
    }

    .infoStyle {
        font-size: 18px; line-height: 18px; color: #0C3B6F; font-weight: 400;;
    }

      @media screen and (max-width: 480px) {
          .welcomeHeading {
            font-size: 24px;
            line-height: 24px;
        }

        .instruction {
            font-size: 14px;
            line-height: 14px;
        }

        .note {
            font-size:12px;
            line-height: 12px;
        }

        .linkStyle {
            font-size: 14px;
            line-height: 14px;
        }
    }


    @media (prefers-color-scheme: dark) {
        .brandingContainer {
            background-color: #0C3B6F;
        }
    }
    </style>
    <!--user entered Head Start-->
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family: 'Inter', sans-serif; color:#000000; background-color:#ffffff;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#ffffff"
        >
          <tr>
            <td valign="top" bgcolor="#ffffff" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="
                                  padding: 0px 0px 0px 0px;
                                  color: #000000;
                                  text-align: left;
                                "
                                bgcolor="#ffffff"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="424d5003-db4c-44a0-a2b1-3f7f767a1afa"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        class="mainContainer"
                                        height="100%"
                                        valign="top"
                                        bgcolor="#ffffff"
                                        role="module-content"
                                      >

                                      <!------------------------------------ START OF CONTENT------------------------------------>

                                        <div class="brandingContainer">
                                          <h1 style="color: #ffffff; font-size: 32px; line-height: 32px;">
                                            mtsüite
                                          </h1>
                                        </div>
                                        <div
                                            style="width: 100%; margin-top: 32px; margin-bottom: 8px; text-align: center;"
                                        >
                                            <span class="scheduleDate">
                                                ${date}
                                            </span>
                                        </div>

                                        <div style="width: 100%; margin-top: 32px; text-align: center;">
                                            <span class="instruction">DESIGNATION<span>
                                        </div>

                                        <div style="width: 100%; margin-top: 16px; text-align: center;">
                                            <span class="infoStyle">| ${location.toUpperCase()} - ${designation.toUpperCase()} |<span>
                                        </div>

                                        <div style="width: 100%; margin-top: 32px; text-align: center;">
                                            <span class="instruction">START TIME<span>
                                        </div>

                                        <div style="width: 100%; margin-top: 16px; text-align: center;">

                                            <span class="infoStyle">| ${startTime} |<span>

                                        </div>

                                        <div style="width: 100%; margin-top: 32px; text-align: center;">
                                            <a href="${url}">
                                            <span class="linkStyle">VIEW FULL SCHEDULE HERE<span>
                                            </a>
                                        </div>
                                        <!------------------------------------ END OF CONTENT------------------------------------>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  data-role="module-unsubscribe"
                                  class="module"
                                  role="module"
                                  data-type="unsubscribe"
                                  style="
                                    color: #444444;
                                    font-size: 12px;
                                    line-height: 20px;
                                    padding: 16px 16px 16px 16px;
                                    text-align: Center;
                                  "
                                  data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                >
                                  <div class="Unsubscribe--addressLine">
                                    <p
                                      class="Unsubscribe--senderName"
                                      style="font-size: 12px; line-height: 20px"
                                    >
                                      Aspen/Snowmass Ski Resort
                                    </p>
                                    <p
                                      style="font-size: 12px; line-height: 20px"
                                    >
                                      <span class="Unsubscribe--senderAddress"
                                        >601 E Dean St</span
                                      >,
                                      <span class="Unsubscribe--senderCity"
                                        >Aspen</span
                                      >,
                                      <span class="Unsubscribe--senderState"
                                        >CO</span
                                      >
                                      <span class="Unsubscribe--senderZip"
                                        >81611</span
                                      >
                                    </p>
                                  </div>
                                  <p style="font-size: 12px; line-height: 20px">
                                    <a
                                      class="Unsubscribe--unsubscribeLink"
                                      href="{{{unsubscribe}}}"
                                      target="_blank"
                                      style=""
                                      >Unsubscribe</a
                                    >
                                    -
                                    <a
                                      href="{{{unsubscribe_preferences}}}"
                                      target="_blank"
                                      class="Unsubscribe--unsubscribePreferences"
                                      style=""
                                      >Unsubscribe Preferences</a
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>

`;

export default newScheduleView;
