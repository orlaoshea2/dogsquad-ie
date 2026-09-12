import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Dog Squad Wicklow" },
      {
        name: "description",
        content:
          "Terms and Conditions for using the Dog Squad website, accounts, bookings and dog-care services.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-ocean">Legal</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-muted-foreground">Last updated: 12 September 2026</p>
          </div>
        </section>

        <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="legal-content max-w-none text-foreground">
            <p className="lead text-lg text-muted-foreground">
              These Terms &amp; Conditions govern your use of dogsquad.ie and your use of Dog Squad&apos;s online
              booking and account services. By using the website, you agree to comply with these terms.
            </p>

            <h2>1. About Dog Squad</h2>
            <p>
              Dog Squad provides dog walking, home visit and related dog-care services in Greystones, Delgany,
              Kilcoole and the surrounding Co. Wicklow area. The website allows customers to view services,
              request bookings, create an account and contact Dog Squad.
            </p>

            <h2>2. Using the website</h2>
            <p>
              You must provide accurate information when using the website, creating an account or making a
              booking. You are responsible for keeping your account credentials secure and for activity carried
              out through your account.
            </p>
            <p>
              You must not use the website for unlawful purposes, attempt to gain unauthorised access to any
              account or system, interfere with the operation or security of the website, or submit information
              that is knowingly false, malicious or unlawful.
            </p>

            <h2>3. Accounts</h2>
            <p>
              Some features, including faster repeat bookings, may be available through a customer account.
              Accounts can be created using email/password or Google sign-in where enabled.
            </p>
            <p>
              You are responsible for the accuracy of the information associated with your account. If you
              believe someone has accessed your account without permission, contact Dog Squad promptly.
            </p>

            <h2>4. Bookings</h2>
            <p>
              The website may allow you to select multiple services, dates and time slots in one booking.
              Submitting a booking request does not change the need for Dog Squad to manage its availability
              and service arrangements.
            </p>
            <p>
              You must provide accurate contact details, dog information and pick-up/drop-off information where
              requested. Please tell Dog Squad about any relevant information that could affect the safe and
              appropriate provision of the service.
            </p>
            <p>
              Dog Squad may contact you to clarify a booking, arrange access, discuss your dog&apos;s needs or
              confirm service arrangements.
            </p>

            <h2>5. Services and pricing</h2>
            <p>
              Services and prices shown on the website may change. At the time of publication, the website
              describes dog walks and home visits with prices displayed on the relevant service and booking
              screens.
            </p>
            <p>
              The price applicable to a booking is the price presented during the booking process or otherwise
              confirmed by Dog Squad. If there is a material error in a displayed price or service description,
              Dog Squad may contact you before providing the service.
            </p>

            <h2>6. Payment</h2>
            <p>
              The booking system may offer different payment methods, including an online payment option and a
              pay-later option. Payment instructions shown during booking or provided by Dog Squad should be
              followed for the selected service.
            </p>
            <p>
              Where an external payment provider is used, that provider&apos;s own terms and privacy policy also
              apply. Dog Squad does not ask customers to enter full card or bank credentials directly into the
              website.
            </p>

            <h2>7. Cancellations and changes</h2>
            <p>
              If you need to cancel or change a booking, please contact Dog Squad as soon as possible using the
              contact details on the website. Any cancellation charge, refund or rescheduling arrangement will
              depend on the circumstances and the booking/service arrangement communicated by Dog Squad.
            </p>
            <p>
              Dog Squad may need to cancel or reschedule a service because of circumstances such as illness,
              severe weather, safety concerns, emergencies or circumstances outside our reasonable control. We
              will make reasonable efforts to contact you and arrange an alternative where appropriate.
            </p>

            <h2>8. Dog and customer responsibilities</h2>
            <p>
              Customers are responsible for providing accurate information about their dog and for telling Dog
              Squad about relevant behavioural, medical, dietary, access or safety considerations that could
              affect the service.
            </p>
            <p>
              Dogs should be appropriately secured and accessible for collection or visits at the agreed time.
              Customers must provide any keys, access instructions or other information reasonably required to
              provide the service safely.
            </p>
            <p>
              Dog Squad may decline, stop or modify a service where we reasonably believe that continuing would
              create an unacceptable risk to a dog, person, property or another animal.
            </p>

            <h2>9. Safety and emergencies</h2>
            <p>
              Dog walking and home visits involve animals and circumstances that cannot always be predicted. If
              an emergency occurs, Dog Squad may take reasonable steps to protect the dog or people involved,
              including contacting you, a veterinary practice or emergency services where appropriate.
            </p>
            <p>
              Customers are responsible for providing accurate emergency contact and veterinary information when
              reasonably requested.
            </p>

            <h2>10. Liability</h2>
            <p>
              Nothing in these terms excludes or limits liability where doing so would be unlawful, including
              liability that cannot legally be excluded or limited under applicable consumer or data protection
              law.
            </p>
            <p>
              Subject to those legal limits, Dog Squad will not be responsible for loss or damage caused by
              circumstances outside our reasonable control or by inaccurate or incomplete information supplied by
              a customer. Any liability that arises will be assessed in accordance with applicable law and the
              circumstances of the service.
            </p>

            <h2>11. Third-party services and links</h2>
            <p>
              The website may link to or use third-party services such as Google for authentication, Revolut for
              payment, Instagram for social content and technology providers used to host and secure the site.
              Third-party services operate under their own terms and policies. Dog Squad is not responsible for
              the content, availability or policies of third-party websites or services.
            </p>

            <h2>12. Intellectual property</h2>
            <p>
              Unless otherwise stated, the Dog Squad website and its content, branding, text, graphics and other
              materials are owned by or used with permission by Dog Squad. You may use the website for personal,
              non-commercial purposes. You must not copy, reproduce, modify, distribute or commercially exploit
              website content without appropriate permission, except where permitted by law.
            </p>

            <h2>13. Website availability</h2>
            <p>
              We aim to keep the website available and accurate, but we do not guarantee uninterrupted or
              error-free operation. We may update, suspend or change parts of the website when necessary for
              maintenance, security, improvements or operational reasons.
            </p>

            <h2>14. Privacy</h2>
            <p>
              Personal information is handled as described in our{" "}
              <Link to="/privacy-policy" className="font-semibold text-ocean hover:underline">Privacy Policy</Link>.
              By using the account and booking features, you acknowledge that information will be processed as
              described there.
            </p>

            <h2>15. Changes to these terms</h2>
            <p>
              We may update these terms when our services or legal requirements change. The latest version will
              be published on this page with the updated date. If a change materially affects an existing
              customer arrangement, we will provide any notice required by law.
            </p>

            <h2>16. Governing law</h2>
            <p>
              These terms are intended to be governed by the laws applicable in Ireland, subject to any mandatory
              consumer protection rights that apply to you. Nothing in these terms removes rights you have under
              applicable consumer or other mandatory law.
            </p>

            <h2>17. Contact</h2>
            <p>
              If you have a question about these terms, a booking or our services, contact Dog Squad at{" "}
              <a href="mailto:hello@dogsquad.ie">hello@dogsquad.ie</a> or on{" "}
              <a href="tel:+353866063416">086 606 3416</a>.
            </p>

            <div className="mt-10 rounded-xl border border-border/60 bg-muted/30 p-5 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Related:</strong>{" "}
                <Link to="/privacy-policy" className="font-semibold text-ocean hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
