import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Dog Squad Wicklow" },
      {
        name: "description",
        content:
          "Privacy Policy for Dog Squad, covering accounts, bookings, Google sign-in, communications and website data.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-ocean">Legal</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">Last updated: 12 September 2026</p>
          </div>
        </section>

        <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="legal-content max-w-none text-foreground">
            <p className="lead text-lg text-muted-foreground">
              Dog Squad respects your privacy. This Privacy Policy explains what personal information we
              collect when you use dogsquad.ie, why we use it, how it is stored and shared, and the choices
              and rights available to you.
            </p>

            <h2>1. Who we are</h2>
            <p>
              The website and services are operated under the name <strong>Dog Squad</strong> ("Dog Squad",
              "we", "us" or "our"). We provide dog walking, home visit and related dog-care services in
              Greystones, Delgany, Kilcoole and the surrounding Co. Wicklow area. The business contact shown
              on this website is Orla O&apos;Shea.
            </p>
            <p>
              For privacy questions or requests, contact us at <a href="mailto:hello@dogsquad.ie">hello@dogsquad.ie</a>{" "}
              or by phone on <a href="tel:+353866063416">086 606 3416</a>.
            </p>

            <h2>2. Information we collect</h2>
            <p>Depending on how you use the site, we may collect:</p>
            <ul>
              <li><strong>Account information:</strong> your name, email address and phone number when you create or use an account.</li>
              <li><strong>Google sign-in information:</strong> if you choose Google sign-in, we receive the basic account information made available by Google, such as your name and email address, together with an account identifier needed to maintain your Dog Squad account.</li>
              <li><strong>Booking information:</strong> your name, email, phone number, dog&apos;s name, breed, pick-up/drop-off address, booking date and time, service and duration, payment method and any notes you provide.</li>
              <li><strong>Dog information:</strong> information you choose to provide about your dog, such as its name and breed, so that we can provide the requested service.</li>
              <li><strong>Consult/contact information:</strong> your name, email, phone number and message when you send us a consultation or contact enquiry.</li>
              <li><strong>Technical information:</strong> information needed to operate, secure and troubleshoot the website, such as browser, device, network and request information supplied through our hosting and security services.</li>
            </ul>

            <h2>3. How we use your information</h2>
            <p>We use personal information only where it is necessary for the operation of Dog Squad, including to:</p>
            <ul>
              <li>create and manage customer accounts;</li>
              <li>process and manage bookings and requested dog-care services;</li>
              <li>contact you about bookings, enquiries and service arrangements;</li>
              <li>respond to free consultation and contact requests;</li>
              <li>remember account details so returning customers can book more easily;</li>
              <li>process or record the payment method selected for a booking;</li>
              <li>protect the website, accounts and booking system from misuse or unauthorised access;</li>
              <li>comply with applicable legal, accounting and regulatory obligations; and</li>
              <li>resolve disputes and enforce our terms where necessary.</li>
            </ul>

            <h2>4. Google sign-in and Google data</h2>
            <p>
              You may create or access a Dog Squad account using Google. If you use this option, Google
              provides basic account information to our authentication service so that we can create and
              maintain your Dog Squad account. Depending on the information made available by Google, this
              can include your Google account name, email address and a unique account identifier.
            </p>
            <p>
              We use Google account information for authentication and account management. The information is
              stored in the account/authentication records used to provide your Dog Squad account. We do not
              sell Google user data, use it for advertising, or use it to build advertising profiles. We only
              request and use the information necessary for the sign-in functionality provided on the site.
            </p>
            <p>
              Google processes information under its own privacy policy and terms. You can review Google&apos;s
              privacy information on Google&apos;s website.
            </p>

            <h2>5. Legal bases for processing</h2>
            <p>
              Where GDPR applies, we rely on the lawful basis that is appropriate to the processing. This may
              include processing that is necessary to take steps at your request or perform a contract, to
              comply with a legal obligation, for our legitimate interests in operating and securing the
              service, or, where appropriate, your consent.
            </p>
            <p>
              Where we rely on consent, you can withdraw that consent. Withdrawal does not affect processing
              that was lawful before the withdrawal.
            </p>

            <h2>6. How information is stored and shared</h2>
            <p>
              Customer account and booking information is stored using our application backend and database
              infrastructure provided through Lovable Cloud and Supabase services. Authentication is also
              provided through this infrastructure.
            </p>
            <p>
              Our website is hosted and delivered through Cloudflare. Cloudflare may process technical and
              network information as part of hosting, security, DNS and performance services.
            </p>
            <p>
              If you choose an online payment option, you may be redirected to a third-party payment service
              such as Revolut. Payment providers process payment information under their own terms and
              privacy policies. Dog Squad does not ask you to enter full card or bank credentials into this
              website.
            </p>
            <p>
              We may disclose information to service providers who process information on our behalf, where
              necessary to operate the website or provide the services, and where permitted or required by
              law. We may also disclose information where required by law, court order or to protect the
              rights, safety or security of Dog Squad, our customers or others.
            </p>

            <h2>7. International processing</h2>
            <p>
              Some technology providers we use may process information outside Ireland or the European
              Economic Area. Where this happens, we rely on the safeguards required by applicable data
              protection law, such as an adequacy decision or appropriate contractual safeguards where
              applicable.
            </p>

            <h2>8. How long we keep information</h2>
            <p>
              We keep personal information only for as long as reasonably necessary for the purposes described
              in this policy. Account information is generally retained while your account remains active and
              for a reasonable period afterwards where needed for legitimate business or legal purposes.
              Booking, payment and business records may be retained for longer where necessary to meet
              accounting, tax, legal, dispute-resolution or other regulatory requirements.
            </p>
            <p>
              When information is no longer required, we take reasonable steps to delete it or otherwise
              anonymise it, subject to technical, legal or security requirements.
            </p>

            <h2>9. Cookies and local storage</h2>
            <p>
              The website uses technologies such as cookies and browser local storage where necessary for
              functionality. For example, the sign-in system stores authentication session information in the
              browser, and the site may remember an email address if you choose the &quot;Remember me&quot; option.
              These technologies help the website work and do not give us access to unrelated information on
              your device.
            </p>

            <h2>10. Your data protection rights</h2>
            <p>
              Subject to applicable law, you may have rights including access to your personal data,
              rectification of inaccurate information, erasure, restriction of processing, objection to certain
              processing, and data portability. You may also have the right to complain to the Data Protection
              Commission or another competent supervisory authority.
            </p>
            <p>
              To exercise a privacy right or ask a question about your information, contact us at{" "}
              <a href="mailto:hello@dogsquad.ie">hello@dogsquad.ie</a>. We may need to verify your identity
              before completing certain requests.
            </p>

            <h2>11. Security</h2>
            <p>
              We use reasonable technical and organisational measures designed to protect personal information
              against unauthorised access, loss, misuse or alteration. No internet service can guarantee
              absolute security, so please take reasonable care with your account credentials and contact us
              promptly if you believe your account has been compromised.
            </p>

            <h2>12. Children</h2>
            <p>
              Dog Squad is a service for dog owners and is not directed at children. We do not knowingly
              collect personal information from children for the purpose of providing an account or booking
              service.
            </p>

            <h2>13. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy when our services, technology or legal obligations change. The
              latest version will be published on this page with an updated date. If a change materially affects
              how we use personal information, we will provide an appropriate notice where required.
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions or privacy requests can be sent to <a href="mailto:hello@dogsquad.ie">hello@dogsquad.ie</a>{" "}
              or by phone on <a href="tel:+353866063416">086 606 3416</a>.
            </p>

            <div className="mt-10 rounded-xl border border-border/60 bg-muted/30 p-5 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Related:</strong>{" "}
                <Link to="/terms" className="font-semibold text-ocean hover:underline">Terms &amp; Conditions</Link>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
