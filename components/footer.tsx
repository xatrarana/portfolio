export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">
              Chhatra <span className="text-primary">Rana</span>
            </h3>
            <p className="text-sm text-muted-foreground">Software Developer & Cybersecurity Enthusiast</p>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chhatra Rana. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}
