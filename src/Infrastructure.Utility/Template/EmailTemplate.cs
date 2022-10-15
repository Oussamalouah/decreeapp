using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Utility.Template
{
    public static class EmailTemplate
    {
        public static string GetContactUsTemplate()
        {
            var str = @"
                  <table id='bodyTable' style='border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; height: 100%; margin: 0; padding: 0; width: 100%; background-color: #ffffff;' border='0' width='100%' cellspacing='0' cellpadding='0' align='center'>
                <tbody>
                <tr>
                <td id='bodyCell' style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; height: 100%; margin: 0; padding: 10px; width: 100%; border-top: 1px none;' align='center' valign='top'>
                <table class='templateContainer' style='border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 1px none; max-width: 600px !important;' border='0' width='100%' cellspacing='0' cellpadding='0'>
                <tbody>
                <tr>
                <td id='templatePreheader' style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0px; padding-bottom: 0px;' valign='top'>&nbsp;</td>
                </tr>
                <tr>
                <td id='templateHeader' style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 9px; padding-bottom: 0;' valign='top'><br />
                <table class='mcnImageBlock' style='min-width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;' border='0' width='100%' cellspacing='0' cellpadding='0'>
                <tbody class='mcnImageBlockOuter'>
                <tr>
                <td class='mcnImageBlockInner' style='padding: 0px; text-size-adjust: 100%; text-align: center;' valign='top'>
                  <img class='image-7' src='https://decree-dev.s3.amazonaws.com/71c85346-a7c3-451c-94f4-2dab3870a955.png' sizes='55px' srcset='https://decree-dev.s3.amazonaws.com/71c85346-a7c3-451c-94f4-2dab3870a955.png 500w, https://decree-dev.s3.amazonaws.com/71c85346-a7c3-451c-94f4-2dab3870a955.png 800w, https://decree-dev.s3.amazonaws.com/71c85346-a7c3-451c-94f4-2dab3870a955.png 894w' alt='' width='200px' height='50px' />
               </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td id='templateBody' style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 2px none #EAEAEA; padding-top: 0; padding-bottom: 0px;' valign='top'><br />
                <table class='mcnTextBlock' style='min-width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;' border='0' width='100%' cellspacing='0' cellpadding='0'>
                <tbody class='mcnTextBlockOuter'>
                <tr>
                <td class='mcnTextBlockInner' style='padding-top: 9px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;' valign='top'>
                <table class='mcnTextContentContainer' style='max-width: 100%; min-width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;' border='0' width='100%' cellspacing='0' cellpadding='0' align='left'>
                <tbody>
                <tr style='height: 203px;'>
                <td class='mcnTextContent' style='padding: 0px 18px 9px;' valign='top'>
                <p style='text-align: center; font-family: &quot;helvetica neue&amp;quot:; line-height: 100%; margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #202020; font-size: 16px;'>&nbsp;</p>
                <p style='line-height: 100%; margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #202020; font-size: 24pt; text-align: center;'><span style='font-size: 24pt;'><strong>Contact Us</strong></span></p>
                <p style='font-family: &quot;helvetica neue&amp;quot:; line-height: 100%; margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #202020; font-size: 16px; text-align: left;'><span style='font-size: 14pt;'><strong>Info:</strong></span></p>
                <table style='height: 28px; width: 563px;'>
                <tbody>
                <tr style='height: 16px;'>
                <td style='width: 355.5px; height: 16px;'>Name: &lt;&lt;Name&gt;&gt;</td>
                </tr>
                <tr style='height: 16px;'>
                <td style='width: 355.5px; height: 16px;'>Email: &lt;&lt;Email&gt;&gt;</td>
                </tr>
                <tr style='height: 16px;'>
                <td style='width: 355.5px; height: 16px;'>Phone Number: &lt;&lt;PhoneNumber&gt;&gt;</td>
                </tr>
                <tr style='height: 16px;'>
                <td style='width: 355.5px; height: 16px;'>Message: &lt;&lt;Message&gt;&gt;</td>
                </tr>
               </tr>
               <tr style='height: 16px;'>
               <td style='width: 355.5px; height: 16px;'>&lt;&lt;AdditionalMessage&gt;&gt;</td>
               </tr>
                </tbody>
                </table>
                <p style='font-family: &quot;helvetica neue&amp;quot:; line-height: 100%; margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #202020; font-size: 16px; text-align: left;'><span style='font-size: 14px;'><span style='font-family: helvetica neue,helvetica,arial,verdana,sans-serif;'>&nbsp;</span></span></p>
                <p style='font-family: &quot;helvetica neue&amp;quot:; line-height: 100%; margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #202020; font-size: 16px; text-align: left;'><br /><strong>Regards</strong><br /><strong>Decree Co.</strong></p>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td id='templateFooter' style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0px; padding-bottom: 0px;' valign='top'>&nbsp;</td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
            ";
            return str;
        }
    }
}
