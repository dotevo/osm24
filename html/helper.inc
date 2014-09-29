\ifdef{LOCALFILES}
\define{\LOCAL{a}}{\warning{\a} \exec{A=$( basename "\a" ) &&echo \"local/${A}\" }}
\else
\define{\LOCAL{a}}{\a}
\endif
