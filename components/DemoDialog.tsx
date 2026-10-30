"use client";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect, useRef } from "react";

// Intercepts clicks on any link marked data-demo-link (e.g. social profiles that don't exist)
// and explains that the site is a demo. Without JS the links behave normally.
export default function DemoDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("a[data-demo-link]")) return;
      e.preventDefault();
      // Keep the smoothed page still behind the modal
      ScrollSmoother.get()?.paused(true);
      dialog.showModal();
    };
    const onClose = () => ScrollSmoother.get()?.paused(false);

    document.addEventListener("click", onClick);
    dialog.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onClick);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-dialog-title"
      // Clicking the backdrop closes the dialog
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto w-[min(100%-2rem,32rem)] border border-line bg-paper p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="p-8 sm:p-10">
        <h2 id="demo-dialog-title" className="text-h3">
          This is a demo project
        </h2>
        <p className="copy mt-6">
          Meridian Architects is a fictional studio created to demonstrate web design and development, so
          its social profiles don’t exist.
        </p>

        <p className="mt-8 border-t border-line pt-6 text-meta tracking-normal text-muted">
          Built by{" "}
          <a href="https://elhuzain.com" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
            elhuzain
          </a>
        </p>

        <form method="dialog" className="mt-8">
          <button type="submit" className="btn" autoFocus>
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
}
