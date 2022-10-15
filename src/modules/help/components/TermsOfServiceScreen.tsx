import React from 'react';
import {PageTitles} from '../../../utils/constants/page-title.constants';
import {DecreeLanding} from '../../core/DecreeLanding';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import tw from 'tailwind-styled-components/dist/tailwind';
import {routes} from '../../../route-list';

export const TermsOfServiceScreen = () => {
  const privacyPolicyUrl = window.location.origin + routes.PRIVACY_POLICY;
  return (
    <DecreePageWrapper>
      <DecreeLanding type={PageTitles.TERMS_OF_SERVICE} />
      <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 fhd:max-w-screen-figma">
        <div className="leading-7 whitespace-pre-wrap  tracking-[0.1em] font-serif text-sm tablet:text-size-21 mt-4 px-4 tablet:px-0">
          <CenterBold>Decree Company</CenterBold>
          <CenterBold>Website Terms of Use</CenterBold>

          <Section>
            <SectionTitle>Acceptance of the Terms of Use</SectionTitle>
            <Section>
              These terms of use are entered into by and between you and Perfect
              Cube, LLC, a North Carolina limited liability company doing
              business as Decree Company (the “Company,” “we,” or “us”). The
              following terms and conditions, together with any documents they
              expressly incorporate by reference (collectively, “Terms of Use”),
              govern your access to and use of{' '}
              <a className="font-bold" href={window.location.origin}>
                {window.location.origin}
              </a>{' '}
              (the “Website”), including any content, functionality, and
              services offered on or through the Website.
            </Section>
            <Section>
              Please read the Terms of Use carefully before you start to use the
              Website. By using the Website [or by clicking to accept or agree
              to the Terms of Use when this option is made available to you],
              you accept and agree to be bound and abide by these Terms of Use
              and our Privacy Policy, found at{' '}
              <a className="font-bold" href={privacyPolicyUrl}>
                {privacyPolicyUrl}
              </a>
              , incorporated herein by reference. If you do not want to agree to
              these Terms of Use or the Privacy Policy, you must not access or
              use the Website.
            </Section>
            <Section>
              This Website is offered and available to users who are 18 years of
              age or older, and reside in the United States or any of its
              territories or possessions. By using this Website, you represent
              and warrant that you are of legal age to form a binding contract
              with the Company and meet all of the foregoing eligibility
              requirements. If you do not meet all of these requirements, you
              must not access or use the Website.
            </Section>
          </Section>

          <Section>
            <SectionTitle>Changes to the Terms of Use</SectionTitle>
            <Section>
              We may revise and update these Terms of Use from time to time in
              our sole discretion. All changes are effective immediately when we
              post them, and apply to all access to and use of the Website
              thereafter. However, any changes to the dispute resolution
              provisions set out in Governing Law and Jurisdiction will not
              apply to any disputes for which the parties have actual notice on
              or before the date the change is posted on the Website.
            </Section>
            <Section>
              Your continued use of the Website following the posting of revised
              Terms of Use means that you accept and agree to the changes. You
              are expected to check this page each time you access this Website
              so you are aware of any changes, as they are binding on you.{' '}
            </Section>
          </Section>
          <Section>
            <SectionTitle>
              Accessing the Website and Account Security
            </SectionTitle>
            <Section>
              We reserve the right to withdraw or amend this Website, and any
              service or material we provide on the Website, in our sole
              discretion without notice. We will not be liable if for any reason
              all or any part of the Website is unavailable at any time or for
              any period. From time to time, we may restrict access to some
              parts of the Website, or the entire Website, to users.
            </Section>
            <Section>You are responsible for both:</Section>
            <List>
              <li>
                Making all arrangements necessary for you to have access to the
                Website.
              </li>
              <li>
                Ensuring that all persons who access the Website through your
                internet connection are aware of these Terms of Use and comply
                with them.
              </li>
            </List>
            <Section>
              To access the Website or some of the resources it offers, you may
              be asked to provide certain registration details or other
              information. It is a condition of your use of the Website that all
              the information you provide on the Website is correct, current,
              and complete. You agree that all information you provide to
              register with this Website or otherwise, including, but not
              limited to, through the use of any interactive features on the
              Website, is governed by our Privacy Policy, found at [PRIVACY
              POLICY URL], and you consent to all actions we take with respect
              to your information consistent with our Privacy Policy.
            </Section>
            <Section>
              If you choose, or are provided with, a user name, password, or any
              other piece of information as part of our security procedures, you
              must treat such information as confidential, and you must not
              disclose it to any other person or entity. You also acknowledge
              that your account is personal to you and agree not to provide any
              other person with access to this Website or portions of it using
              your user name, password, or other security information. You agree
              to notify us immediately of any unauthorized access to or use of
              your user name or password or any other breach of security. You
              also agree to ensure that you exit from your account at the end of
              each session. You should use particular caution when accessing
              your account from a public or shared computer so that others are
              not able to view or record your password or other personal
              information.
            </Section>
            <Section>
              We have the right to disable any user name, password, or other
              identifier, whether chosen by you or provided by us, at any time
              in our sole discretion for any or no reason, including if, in our
              opinion, you have violated any provision of these Terms of Use.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Intellectual Property Rights</SectionTitle>
            <Section>
              The Website and its entire contents, features, and functionality
              (including but not limited to all information, software, text,
              displays, images, video, and audio, and the design, selection, and
              arrangement thereof) are owned by the Company, its licensors, or
              other providers of such material and are protected by United
              States and international copyright, trademark, patent, trade
              secret, and other intellectual property or proprietary rights
              laws.
            </Section>
            <Section>
              These Terms of Use permit you to use the Website for your
              personal, non-commercial use, or for legitimate business purposes
              relating to your role as a potential or current supplier,
              distributor, or customer of the Company. You must not reproduce,
              distribute, modify, create derivative works of, publicly display,
              publicly perform, republish, download, store, or transmit any of
              the material on our Website, except as follows:
            </Section>
            <List>
              <li>
                Your computer may temporarily store copies of such materials in
                RAM incidental to your accessing and viewing those materials.
              </li>
              <li>
                You may store files that are automatically cached by your Web
                browser for display enhancement purposes.
              </li>
              <li>
                You may print or download one copy of a reasonable number of
                pages of the Website for your own personal, non-commercial use,
                or for legitimate business purposes relating to your role as a
                potential or current supplier, distributor, or customer of the
                Company, but not for further reproduction, publication, or
                distribution.
              </li>
              <li>
                If we provide desktop, mobile, or other applications for
                download, you may download a single copy to your computer or
                mobile device solely for your own personal, non-commercial use,
                or for legitimate business purposes relating to your role as a
                potential or current supplier, distributor, or customer of the
                Company, provided you agree to be bound by our end user license
                agreement for such applications.
              </li>
              <li>
                If we provide social media features with certain content, you
                may take such actions as are enabled by such features.
              </li>
            </List>
            <Section>You must not:</Section>
            <List>
              <li>Modify copies of any materials from the Website.</li>
              <li>
                Use any illustrations, photographs, video or audio sequences, or
                any graphics separately from the accompanying text.
              </li>
              <li>
                Delete or alter any copyright, trademark, or other proprietary
                rights notices from copies of materials from the Website.
              </li>
            </List>
            <Section>
              You must not access or use any part of the Website or any services
              or materials available through the Website except for your own
              personal, non-commercial use, or for legitimate business purposes
              relating to your role as a potential or current supplier,
              distributor, or customer of the Company.
            </Section>
            <Section>
              If you print, copy, modify, download, or otherwise use or provide
              any other person with access to any part of the Website in breach
              of the Terms of Use, your right to use the Website will stop
              immediately and you must, at our option, return or destroy any
              copies of the materials you have made. No right, title, or
              interest in or to the Website or any content on the Website is
              transferred to you, and all rights not expressly granted are
              reserved by the Company. Any use of the Website not expressly
              permitted by these Terms of Use is a breach of these Terms of Use
              and may violate copyright, trademark, and other laws.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Trademarks</SectionTitle>
            <Section>
              The Company name, the terms [COMPANY TRADEMARKS], [the Company
              logo,] and all related names, logos, product and service names,
              designs, and slogans are trademarks of the Company or its
              affiliates or licensors. You must not use such marks without the
              prior written permission of the Company. All other names, logos,
              product and service names, designs, and slogans on this Website
              are the trademarks of their respective owners.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Prohibited Uses</SectionTitle>
            <Section>
              You may use the Website only for lawful purposes and in accordance
              with these Terms of Use. You agree not to use the Website:
            </Section>
            <List>
              <li>
                In any way that violates any applicable federal, state, local,
                or international law or regulation (including, without
                limitation, any laws regarding the export of data or software to
                and from the US or other countries).{' '}
              </li>
              <li>
                For the purpose of exploiting, harming, or attempting to exploit
                or harm minors in any way by exposing them to inappropriate
                content, asking for personally identifiable information, or
                otherwise.
              </li>
              <li>
                To send, knowingly receive, upload, download, use, or re-use any
                material that does not comply with the Content Standards set out
                in these Terms of Use.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material, including any “junk mail,” “chain letter,”
                “spam,” or any other similar solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company
                employee, another user, or any other person or entity
                (including, without limitation, by using email addresses
                associated with any of the foregoing).
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits
                anyone's use or enjoyment of the Website, or which, as
                determined by us, may harm the Company or users of the Website,
                or expose them to liability.
              </li>
            </List>
            <Section>Additionally, you agree not to:</Section>
            <List>
              <li>
                Use the Website in any manner that could disable, overburden,
                damage, or impair the Website or interfere with any other
                party’s use of the Website, including their ability to engage in
                real time activities through the Website.
              </li>
              <li>
                Use any robot, spider, or other automatic device, process, or
                means to access the Website for any purpose, including
                monitoring or copying any of the material on the Website.
              </li>
              <li>
                Use any manual process to monitor or copy any of the material on
                the Website, or for any other purpose not expressly authorized
                in these Terms of Use, without our prior written consent.
              </li>
              <li>
                Use any device, software, or routine that interferes with the
                proper working of the Website.
              </li>
              <li>
                Introduce any viruses, Trojan horses, worms, logic bombs, or
                other material that is malicious or technologically harmful.
              </li>
              <li>
                Attempt to gain unauthorized access to, interfere with, damage,
                or disrupt any parts of the Website, the server on which the
                Website is stored, or any server, computer, or database
                connected to the Website.
              </li>
              <li>
                Attack the Website via a denial-of-service attack or a
                distributed denial-of-service attack.
              </li>
              <li>
                Otherwise attempt to interfere with the proper working of the
                Website.
              </li>
            </List>
          </Section>
          <Section>
            <SectionTitle>User Contributions</SectionTitle>
            <Section>
              The Website may contain message boards, chat rooms, personal web
              pages or profiles, forums, bulletin boards, and other interactive
              features (collectively, “Interactive Services”) that allow users
              to post, submit, publish, display, or transmit to other users or
              other persons (hereinafter, “post”) content or materials
              (collectively, “User Contributions”) on or through the Website.
            </Section>
            <Section>
              All User Contributions must comply with the Content Standards set
              out in these Terms of Use.
            </Section>
            <Section>
              Any User Contribution you post to the Website will be considered
              non-confidential and non-proprietary. By providing any User
              Contribution on the Website, you grant us and our affiliates and
              service providers, and each of their and our respective licensees,
              successors, and assigns the right to use, reproduce, modify,
              perform, display, distribute, and otherwise disclose to third
              parties any such material for any purpose.
            </Section>
            <Section>You represent and warrant that:</Section>
            <List>
              <li>
                You own or control all rights in and to the User Contributions
                and have the right to grant the license granted above to us and
                our affiliates and service providers, and each of their and our
                respective licensees, successors, and assigns.
              </li>
              <li>
                All of your User Contributions do and will comply with these
                Terms of Use.
              </li>
            </List>
            <Section>
              You understand and acknowledge that you are responsible for any
              User Contributions you submit or contribute, and you, not the
              Company, have full responsibility for such content, including its
              legality, reliability, accuracy, and appropriateness.
            </Section>
            <Section>
              We are not responsible or liable to any third party for the
              content or accuracy of any User Contributions posted by you or any
              other user of the Website.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Monitoring and Enforcement; Termination</SectionTitle>
            <Section>We have the right to:</Section>
            <List>
              <li>
                Remove or refuse to post any User Contributions for any or no
                reason in our sole discretion.
              </li>
              <li>
                Take any action with respect to any User Contribution that we
                deem necessary or appropriate in our sole discretion, including
                if we believe that such User Contribution violates the Terms of
                Use, including the Content Standards, infringes any intellectual
                property right or other right of any person or entity, threatens
                the personal safety of users of the Website or the public, or
                could create liability for the Company.
              </li>
              <li>
                Disclose your identity or other information about you to any
                third party who claims that material posted by you violates
                their rights, including their intellectual property rights or
                their right to privacy.
              </li>
              <li>
                Take appropriate legal action, including without limitation,
                referral to law enforcement, for any illegal or unauthorized use
                of the Website.
              </li>
              <li>
                Terminate or suspend your access to all or part of the Website
                for any or no reason, including without limitation, any
                violation of these Terms of Use.
              </li>
            </List>
            <Section>
              Without limiting the foregoing, we have the right to cooperate
              fully with any law enforcement authorities or court order
              requesting or directing us to disclose the identity or other
              information of anyone posting any materials on or through the
              Website. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS
              AFFILIATES, LICENSEES, AND SERVICE PROVIDERS FROM ANY CLAIMS
              RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES
              DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER
              SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
            </Section>
            <Section>
              However, we do not undertake to review all material before it is
              posted on the Website, and cannot ensure prompt removal of
              objectionable material after it has been posted. Accordingly, we
              assume no liability for any action or inaction regarding
              transmissions, communications, or content provided by any user or
              third party. We have no liability or responsibility to anyone for
              performance or nonperformance of the activities described in this
              section.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Content Standards</SectionTitle>
            <Section>
              These content standards apply to any and all User Contributions
              and use of Interactive Services. User Contributions must in their
              entirety comply with all applicable federal, state, local, and
              international laws and regulations. Without limiting the
              foregoing, User Contributions must not:
            </Section>
            <List>
              <li>
                Contain any material that is defamatory, obscene, indecent,
                abusive, offensive, harassing, violent, hateful, inflammatory,
                or otherwise objectionable.
              </li>
              <li>
                Promote sexually explicit or pornographic material, violence, or
                discrimination based on race, sex, religion, nationality,
                disability, sexual orientation, or age.
              </li>
              <li>
                Infringe any patent, trademark, trade secret, copyright, or
                other intellectual property or other rights of any other person.
              </li>
              <li>
                Violate the legal rights (including the rights of publicity and
                privacy) of others or contain any material that could give rise
                to any civil or criminal liability under applicable laws or
                regulations or that otherwise may be in conflict with these
                Terms of Use and our Privacy Policy.
              </li>
              <li>Be likely to deceive any person.</li>
              <li>
                Promote any illegal activity, or advocate, promote, or assist
                any unlawful act.
              </li>
              <li>
                Cause annoyance, inconvenience, or needless anxiety or be likely
                to upset, embarrass, alarm, or annoy any other person.
              </li>
              <li>
                Impersonate any person, or misrepresent your identity or
                affiliation with any person or organization.
              </li>
              <li>
                Involve commercial activities or sales, such as contests,
                sweepstakes, and other sales promotions, barter, or advertising.
              </li>
              <li>
                Give the impression that they emanate from or are endorsed by us
                or any other person or entity, if this is not the case.
              </li>
            </List>
          </Section>
          <Section>
            <SectionTitle>Copyright Infringement</SectionTitle>
            <Section>
              We take claims of copyright infringement seriously. We will
              respond to notices of alleged copyright infringement that comply
              with applicable law. If you believe any materials accessible on or
              from the Website infringe your copyright, you may request removal
              of those materials (or access to them) from the Website by
              submitting written notification to our copyright agent designated
              below. In accordance with the Online Copyright Infringement
              Liability Limitation Act of the Digital Millennium Copyright Act
              (17 U.S.C. § 512) (“DMCA”), the written notice (the “DMCA Notice”)
              must include substantially the following:
            </Section>
            <List>
              <li>Your physical or electronic signature.</li>
              <li>
                Identification of the copyrighted work you believe to have been
                infringed or, if the claim involves multiple works on the
                Website, a representative list of such works.
              </li>

              <li>
                Identification of the material you believe to be infringing in a
                sufficiently precise manner to allow us to locate that material.
              </li>

              <li>
                Adequate information by which we can contact you (including your
                name, postal address, telephone number, and, if available, email
                address).
              </li>

              <li>
                A statement that you have a good faith belief that use of the
                copyrighted material is not authorized by the copyright owner,
                its agent, or the law.
              </li>

              <li>
                A statement that the information in the written notice is
                accurate.
              </li>

              <li>
                A statement, under penalty of perjury, that you are authorized
                to act on behalf of the copyright owner.
              </li>
            </List>
            <Section>
              Our designated copyright agent to receive DMCA Notices is:
            </Section>
            <Section>
              <div>[FIRST AND LAST NAME OF AGENT]</div>
              <div>[NAME OF AGENT'S ORGANIZATION]</div>
              <div>[PHYSICAL MAIL ADDRESS OF AGENT]</div>
              <div>[TELEPHONE NUMBER OF AGENT]</div>
              <div>[EMAIL ADDRESS OF AGENT FOR THIS PURPOSE]</div>
            </Section>
            <Section>
              If you fail to comply with all of the requirements of Section
              512(c)(3) of the DMCA, your DMCA Notice may not be effective.
            </Section>
            <Section>
              Please be aware that if you knowingly materially misrepresent that
              material or activity on the Website is infringing your copyright,
              you may be held liable for damages (including costs and attorneys'
              fees) under Section 512(f) of the DMCA.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Counter Notification Procedures</SectionTitle>
            <Section>
              If you believe that material you posted on the Website was removed
              or access to it was disabled by mistake or misidentification, you
              may file a counter notification with us (a “Counter Notice”) by
              submitting written notification to our copyright agent designated
              above. Pursuant to the DMCA, the Counter Notice must include
              substantially the following:
            </Section>
            <List>
              <li>Your physical or electronic signature.</li>
              <li>
                An identification of the material that has been removed or to
                which access has been disabled and the location at which the
                material appeared before it was removed or access disabled.
              </li>
              <li>
                Adequate information by which we can contact you (including your
                name, postal address, telephone number, and, if available, email
                address).
              </li>
              <li>
                A statement under penalty of perjury by you that you have a good
                faith belief that the material identified above was removed or
                disabled as a result of a mistake or misidentification of the
                material to be removed or disabled.
              </li>
              <li>
                A statement that you will consent to the jurisdiction of the
                Federal District Court for the judicial district in which your
                address is located (or if you reside outside the United States
                for any judicial district in which the Website may be found) and
                that you will accept service from the person (or an agent of
                that person) who provided the Website with the complaint at
                issue.
              </li>
            </List>
            <Section>
              The DMCA allows us to restore the removed content if the party
              filing the original DMCA Notice does not file a court action
              against you within ten business days of receiving the copy of your
              Counter Notice.
            </Section>
            <Section>
              Please be aware that if you knowingly materially misrepresent that
              material or activity on the Website was removed or disabled by
              mistake or misidentification, you may be held liable for damages
              (including costs and attorneys' fees) under Section 512(f) of the
              DMCA.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Repeat Infringers</SectionTitle>
            <Section>
              It is our policy in appropriate circumstances to disable and/or
              terminate the accounts of users who are repeat infringers.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Reliance on Information Posted</SectionTitle>
            <Section>
              The Website may include content provided by third parties,
              including materials provided by other users, bloggers, and
              third-party licensors, syndicators, aggregators, and/or reporting
              services. All statements and/or opinions expressed in these
              materials, and all articles and responses to questions and other
              content, other than the content provided by the Company, are
              solely the opinions and the responsibility of the person or entity
              providing those materials. These materials do not necessarily
              reflect the opinion of the Company. We are not responsible, or
              liable to you or any third party, for the content or accuracy of
              any materials provided by any third parties.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Changes to the Website</SectionTitle>
            <Section>
              We may update the content on this Website from time to time, but
              its content is not necessarily complete or up-to-date. Any of the
              material on the Website may be out of date at any given time, and
              we are under no obligation to update such material.
            </Section>
          </Section>
          <Section>
            <SectionTitle>
              Information About You and Your Visits to the Website
            </SectionTitle>
            <Section>
              All information we collect on this Website is subject to our
              Privacy Policy. By using the Website, you consent to all actions
              taken by us with respect to your information in compliance with
              the Privacy Policy.
            </Section>
          </Section>
          <Section>
            <SectionTitle>
              Online Purchases and Other Terms and Conditions
            </SectionTitle>
            <Section>
              All purchases through the Website or other transactions for the
              sale of goods/services formed through the Website, or resulting
              from visits made by you, are governed by our Terms of Sale [LINK
              TO TERMS OF SALE], which are hereby incorporated into these Terms
              of Use.
            </Section>
            <Section>
              Additional terms and conditions may also apply to specific
              portions, services, or features of the Website. All such
              additional terms and conditions are hereby incorporated by this
              reference into these Terms of Use.
            </Section>
          </Section>
          <Section>
            <SectionTitle>
              Linking to the Website and Social Media Features
            </SectionTitle>
            <Section>
              You may link to our homepage, provided you do so in a way that is
              fair and legal and does not damage our reputation or take
              advantage of it, but you must not establish a link in such a way
              as to suggest any form of association, approval, or endorsement on
              our part.
            </Section>
            <Section>
              This Website may provide certain social media features that enable
              you to:
            </Section>
            <List>
              <li>
                Link from your own or certain third-party websites to certain
                content on this Website.
              </li>
              <li>
                Send emails or other communications with certain content, or
                links to certain content, on this Website.
              </li>

              <li>
                Cause limited portions of content on this Website to be
                displayed or appear to be displayed on your own or certain
                third-party websites.
              </li>
            </List>
            <Section>
              You may use these features solely as they are provided by us,
              solely with respect to the content they are displayed with, and
              otherwise in accordance with any additional terms and conditions
              we provide with respect to such features. Subject to the
              foregoing, you must not:
            </Section>
            <List>
              <li>
                Establish a link from any website that is not owned by you.
              </li>
              <li>
                Cause the Website or portions of it to be displayed on, or
                appear to be displayed by, any other site, for example, framing,
                deep linking, or in-line linking.
              </li>

              <li>Link to any part of the Website other than the homepage.</li>

              <li>
                Otherwise take any action with respect to the materials on this
                Website that is inconsistent with any other provision of these
                Terms of Use.
              </li>
            </List>
            <Section>
              The website from which you are linking, or on which you make
              certain content accessible, must comply in all respects with the
              Content Standards set out in these Terms of Use.
            </Section>
            <Section>
              You agree to cooperate with us in causing any unauthorized framing
              or linking immediately to stop. We reserve the right to withdraw
              linking permission without notice.
            </Section>
            <Section>
              We may disable all or any social media features and any links at
              any time without notice in our discretion.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Links from the Website</SectionTitle>
            <Section>
              If the Website contains links to other sites and resources
              provided by third parties, these links are provided for your
              convenience only. This includes links contained in advertisements,
              including banner advertisements and sponsored links. We have no
              control over the contents of those sites or resources, and accept
              no responsibility for them or for any loss or damage that may
              arise from your use of them. If you decide to access any of the
              third-party websites linked to this Website, you do so entirely at
              your own risk and subject to the terms and conditions of use for
              such websites.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Geographic Restrictions</SectionTitle>
            <Section>
              The owner of the Website is based in the State of North Carolina
              in the United States. We provide this Website for use only by
              persons located in the United States. We make no claims that the
              Website or any of its content is accessible or appropriate outside
              of the United States. Access to the Website may not be legal by
              certain persons or in certain countries. If you access the Website
              from outside the United States, you do so on your own initiative
              and are responsible for compliance with local laws.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Disclaimer of Warranties</SectionTitle>
            <Section>
              You understand that we cannot and do not guarantee or warrant that
              files available for downloading from the internet or the Website
              will be free of viruses or other destructive code. You are
              responsible for implementing sufficient procedures and checkpoints
              to satisfy your particular requirements for anti-virus protection
              and accuracy of data input and output, and for maintaining a means
              external to the Website for any reconstruction of any lost data.
              TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR
              ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE
              ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT
              MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR
              OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY
              SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR
              DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED
              TO IT.
            </Section>
            <Section>
              YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS
              CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE
              ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE
              COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY
              WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
              SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
              WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR
              ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE
              WEBSITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
              THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR
              UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE WEBSITE OR
              THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS, OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR
              EXPECTATIONS.
            </Section>
            <Section>
              TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY
              DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
              STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
              WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR
              PARTICULAR PURPOSE.
            </Section>
            <Section>
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Limitation on Liability</SectionTitle>
            <Section>
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE
              COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
              EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF
              ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION
              WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES
              LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES,
              INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO,
              PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
              REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS,
              LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY
              TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE,
              EVEN IF FORESEEABLE.
            </Section>
            <Section>
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Indemnification</SectionTitle>
            <Section>
              You agree to defend, indemnify, and hold harmless the Company, its
              affiliates, licensors, and service providers, and its and their
              respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against any
              claims, liabilities, damages, judgments, awards, losses, costs,
              expenses, or fees (including reasonable attorneys’ fees) arising
              out of or relating to your violation of these Terms of Use or your
              use of the Website, including, but not limited to, your User
              Contributions, any use of the Website’s content, services, and
              products other than as expressly authorized in these Terms of Use,
              or your use of any information obtained from the Website.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Governing Law and Jurisdiction</SectionTitle>
            <Section>
              All matters relating to the Website and these Terms of Use, and
              any dispute or claim arising therefrom or related thereto (in each
              case, including non-contractual disputes or claims), shall be
              governed by and construed in accordance with the internal laws of
              the State of North Carolina without giving effect to any choice or
              conflict of law provision or rule (whether of the State of North
              Carolina or any other jurisdiction).
            </Section>
            <Section>
              Any legal suit, action, or proceeding arising out of, or related
              to, these Terms of Use or the Website shall be instituted
              exclusively in the federal courts of the United States or the
              courts of the State of North Carolina, in each case located in
              Wake County. You waive any and all objections to the exercise of
              jurisdiction over you by such courts and to venue in such courts.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Arbitration</SectionTitle>
            <Section>
              At the Company’s sole discretion, it may require you to submit any
              disputes arising from these Terms of Use or use of the Website,
              including disputes arising from or concerning their
              interpretation, violation, invalidity, non-performance, or
              termination, to final and binding arbitration under the Rules of
              Arbitration of the American Arbitration Association applying North
              Carolina law.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Limitation on Time to File Claims</SectionTitle>
            <Section>
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
              RELATING TO THESE TERMS OF USE OR THE WEBSITE MUST BE COMMENCED
              WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE,
              SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Waiver and Severability</SectionTitle>
            <Section>
              No waiver by the Company of any term or condition set out in these
              Terms of Use shall be deemed a further or continuing waiver of
              such term or condition or a waiver of any other term or condition,
              and any failure of the Company to assert a right or provision
              under these Terms of Use shall not constitute a waiver of such
              right or provision.
            </Section>
            <Section>
              If any provision of these Terms of Use is held by a court or other
              tribunal of competent jurisdiction to be invalid, illegal, or
              unenforceable for any reason, such provision shall be eliminated
              or limited to the minimum extent such that the remaining
              provisions of the Terms of Use will continue in full force and
              effect.
            </Section>
          </Section>
          <Section>
            <SectionTitle>Entire Agreement</SectionTitle>
            <Section>
              The Terms of Use, our Privacy Policy, and Terms of Sale constitute
              the sole and entire agreement between you and Perfect Cube, LLC
              regarding the Website and supersede all prior and contemporaneous
              understandings, agreements, representations, and warranties, both
              written and oral, regarding the Website.
            </Section>
          </Section>
        </div>
      </div>
    </DecreePageWrapper>
  );
};

const Section = tw.div`my-4`;

const SectionTitle = tw.div`font-bold underline`;

const CenterBold = tw.div`font-bold text-center`;

const List = tw.ul`list-disc`;
