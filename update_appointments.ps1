$path = "c:\Users\mtnoo\OneDrive\Desktop\EasyHMS\NexEagleWebsite\app\appointments\AppointmentsClient.tsx"
$content = Get-Content -Path $path -Raw

$content = $content -replace 'import PhoneVerification from "@/components/patient/PhoneVerification";\r?\n', ''
$content = $content -replace '  const \[showVerification, setShowVerification\] = useState\(false\);\r?\n', ''
$content = $content -replace '  const handleVerified = \(\) => setShowVerification\(false\);\r?\n\r?\n', ''

# Replace block 1
$old1 = '        {!showVerification && (
          <div className="flex items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
              My Appointments
            </h1>
            {isLoggedIn ? (
              <button
                onClick={() => logout.mutate()}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setShowVerification(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-teal-700 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" /> Log in
              </button>
            )}
          </div>
        )}

        {showVerification ? (
          <div className="py-10">
            <PhoneVerification onVerified={handleVerified} />
          </div>
        ) : hasAnyAppointments ? ('
$new1 = '          <div className="flex items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
              My Appointments
            </h1>
            {isLoggedIn ? (
              <button
                onClick={() => logout.mutate()}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-teal-700 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" /> Log in
              </Link>
            )}
          </div>

        {hasAnyAppointments ? ('

$content = [System.Text.RegularExpressions.Regex]::Replace($content, [regex]::Escape($old1.Replace("`r`n", "`n")), $new1.Replace("`r`n", "`n").Replace("`n", "`r`n"))
$content = [System.Text.RegularExpressions.Regex]::Replace($content, [regex]::Escape($old1), $new1)


# Replace block 2
$old2 = '                <button
                  onClick={() => setShowVerification(true)}
                  className="mt-2 text-xs font-bold text-brand-teal hover:text-teal-700"
                >
                  Log In With WhatsApp →
                </button>'
$new2 = '                <Link
                  href="/login"
                  className="mt-2 text-xs font-bold text-brand-teal hover:text-teal-700 inline-block"
                >
                  Log In With WhatsApp →
                </Link>'
$content = [System.Text.RegularExpressions.Regex]::Replace($content, [regex]::Escape($old2), $new2)

# Replace block 3
$old3 = '                <button
                  onClick={() => setShowVerification(true)}
                  className="px-6 py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto"
                >
                  Log In With WhatsApp
                </button>'
$new3 = '                <Link
                  href="/login"
                  className="px-6 py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto text-center"
                >
                  Log In With WhatsApp
                </Link>'
$content = [System.Text.RegularExpressions.Regex]::Replace($content, [regex]::Escape($old3), $new3)

Set-Content -Path $path -Value $content -Encoding UTF8
