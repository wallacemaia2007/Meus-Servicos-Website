$ports = @(3000, 3001, 4200, 5173, 5174, 8080)

$connections = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $ports -contains $_.LocalPort -and $_.OwningProcess -ne 0 }

if (-not $connections) {
  Write-Host "No dev ports are currently listening."
  exit 0
}

$processIds = $connections |
  Select-Object -ExpandProperty OwningProcess -Unique

foreach ($processId in $processIds) {
  $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

  if (-not $process) {
    continue
  }

  $portsForProcess = $connections |
    Where-Object { $_.OwningProcess -eq $processId } |
    Select-Object -ExpandProperty LocalPort -Unique

  Write-Host "Killing $($process.ProcessName) ($processId) on port(s): $($portsForProcess -join ', ')"
  Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
}
