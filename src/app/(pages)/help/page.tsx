import Link from "next/link";

const HelpPage = () => {
  return (
    <div className="p-5">
      <h1 className="mb-6 text-3xl font-bold text-center uppercase ">
        Need Help?
      </h1>
      <p className="mb-8 space-y-3 text-center">
        Welcome to the help center. Here you will find answers to common
        questions and ways to contact support if needed.
      </p>
      <div className="p-6 border rounded border-lightBorder dark:border-darkBorder">
        {/* Documentation & Guides Section */}
        <div className="pt-4 text-center">
          <h2 className="text-xl font-semibold">Documentation & Guides</h2>
          <p className="mt-2">
            Explore our step-by-step guides and documentation for detailed
            instructions.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link href="/" className="text-sky-600">
              Getting Started Guide
            </Link>
            <Link href="/" className="text-sky-600">
              User Management
            </Link>
            <Link href="/" className="text-sky-600">
              Troubleshooting
            </Link>
          </div>
          {/* Feedback & Bug Reporting Section */}
          <div className="pt-6 mt-10 text-center border-t border-lightBorder dark:border-darkBorder">
            <h2 className="text-xl font-semibold">Feedback & Bug Reporting</h2>
            <p className="mt-2">
              Help us improve by providing feedback or reporting any issues you
              encounter.
            </p>
            <div className="mt-4 space-y-2">
              Report a bug:{" "}
              <div className="flex justify-center gap-3 text-center">
                <a
                  href="mailto: gaurav@neriticindustries.in"
                  className="text-red-600"
                >
                  gaurav@neriticindustries.in
                </a>
                |
                <a
                  href="mailto:  sanket@neriticindustries.in"
                  className="text-red-600"
                >
                  sanket@neriticindustries.in
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="pt-6 mt-10 text-center border-t border-lightBorder dark:border-darkBorder">
          <h2 className="text-xl font-semibold">Still need help?</h2>
          <p className="mt-2">Contact our support team.</p>
          <div className="mt-4 space-y-2">
            <p>
              Email:{" "}
              <a
                href="mailto: neriticwellness@gamil.com"
                className="text-green-500"
              >
                neriticwellness@gmail.com
              </a>
            </p>
            <p>
              Phone: <span className="">+91 84848014597</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
