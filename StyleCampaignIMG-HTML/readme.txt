================
Style Campaign HTML layout generator v1.0.0.1
Last Updated 1-8-2010
=================

Contents.
=============

* Description
* Installation
* Usage
* License


Description.
=============

Style Campaign HTML layout generator is a simple HTML generator. It is primarily
intended for converting Bitmap images to HTML files optimised for use in the email
environment, though it may be used as a layout tool for experimental HTML designs.

It is a command-line application. It reads a BMP image file and writes a
HTML text file. Supported platforms include Windows only at present.

All output files will be written to the directory of the source Bitmap unless
otherwise specified. File paths may be relative or absolute. All HTML output
files will be named as the source bitmap substituting '.html' for '.bmp' unless
otherwise specified.


Features include:
* Simple drag and drop functionality
* Block based compression of HTML output
* Scalable output
* Support for Bitmap files at all color depths.
* Background color transparency
* Color targeted block compression
* W3C specification compatibility**
* HTML DOCTYPE agnostic
* Optional CSS output
* Microsoft Outlook 2007/XP compatibilty
* Formatted HTML output

(NOTE**) Output cannot be described as fully W3C standards compatible
as some of the W3C specification is redundant e.g. TABLE 'summary' property
only utilised by "non-visual" browsers...


Installation.
=============

1. Extract the zip contents to any directory.


Usage.
=========

1. drag and drop bitmap on exe, follow console instructions.

2. double click exe, follow console instructions.

3. Run from console using command line arguments (advanced mode).

Run from console with single argument will list all parameters.

Command line parameters (advanced mode):

-f = input filename [string]
-n = output filename [string] (optional)
-x = scale [int] (optional)
-g = table block size [int] (width and height = single param)(optional)
-b = background colour [string] (optional)
-r = raw output? (optional)(not functional in c version) 
-k = process transparency (optional)(when no bgcolor specified)
-z = use block compression (optional)
-w = minimum compression block size [int] (optional)
-v = filter colour [string] (optional with block compression)
-d = fix DOCTYPE error (optional with block compression)
-a = full header (optional)
-h = html (default)(no parameter)
-c = css (optional)
-s = strict css (optional with css)(use full property names)
-t = don't generate return characters (optional)


Command line function description:

-f = Bitmap filename, may include path, must include '.bmp'
-n = HTML output filename, must include '.htm' or '.html'
-x = Scale html output, integer, default = no scaling (1x)
-g = Maximum size of HTML tables generated
-b = All pixels matching specified background color will generate empty table cell
-k = All pixels matching default background color will generate empty table cell 
-z = Block compression of HTML output, simple RLE type compression will be used by default 
-w = Minimum width of compression block generated, default = 1 
-v = Targeted block compression color. Only blocks of this color will be created if general block compression disabled
-d = Make output HTML DOCTYPE agnostic
-a = Output HTML DOCTYPE in header
-h = Create HTML table based output 
-c = Create inlined CSS div element based output (NOTE: block compression not functional in CSS mode at this time) 
-s = CSS output uses strict property names, W3C specification
-t = Remove formatting return characters from HTML output, results in smaller but less 'readable' file.



License.
=============

License Agreement for 'Style Campaign HTML layout generator'

Copyright ©2007-2010, Style Campaign
All rights reserved

IMPORTANT! Read carefully: this is a legal agreement.

By downloading, installing, copying, saving or otherwise using this Software,
You (as defined below) become a party to this agreement and You are bound by
all the terms and conditions of this agreement.
If You do not agree to any of the terms or any of the conditions, or any of
the terms or conditions isn't valid in Your country, you must not install or
otherwise use the Software.
If you have already downloaded or installed Software, you must remove the
Software from Your system and destroy all copies.


1. Parties

"Style Campaign" means Alexander Yeaman, Author of "Style Campaign HTML layout generator".

"You" (or "Your") means an individual or a legal entity exercising rights under,
and complying with all of the terms of, this agreement or a future version of
this agreement. For legal entities, "You" includes any entity which controls,
is controlled by, or is under common control with You. For purposes of this
definition, "control" means
(a) the power, direct or indirect, to cause the direction or management of such entity,
whether by contract or otherwise, or
(b) ownership of more than fifty percent (50%) of the outstanding shares or
beneficial ownership of such entity.


2. Definitions

"Software" means the binary code of Style Campaign HTML layout generator, with all its
documentation and otherwise bundled files, in whole or in parts.


3. Grant of license

The Software is owned and copyrighted by Style Campaign. It is licensed, not sold.
Title to the Software and all associated intellectual property rights are retained
by Style Campaign. Style Campaign grants You a non-exclusive and non-transferable right
to use the Software for lawful purposes under certain obligations and limited rights as
set forth in this agreement.

You may:

   - Make one copy of the Software for archival purposes.

You must not:

   1. reverse engineer, decompile, disassemble or otherwise make any attempt to 
      discover the source code of the Software;
   2. modify or create derivative work based upon the Software in whole or in parts;
   3. distribute copies of the Software in whole or in parts;
   4. publicly display the Software;
   5. remove any proprietary notices, labels or copyrights from the Software;
   6. resell, redistribute, lease, rent, transfer, sublicense or otherwise transfer
      rights of the Software without the prior written consent of Style Campaign.


4. Disclaimer of warranty

The Software is provided "AS IS". Unless specified in this agreement, all expressed or
implied conditions, representations and warranties, including any implied warranty of
merchantability, fitness for a particular purpose or non-infringement are disclaimed.


5. Limitation of liability

To the extent not prohibited by law, in no event will Style Campaign be liable for any
lost revenue, profit or data or for special, indirect, consequential, incidental or punitive
damages, however caused regardless of the theory of liability, arising out of or related
to the use of or inability to use the Software, even if Style Campaign has been advised
of the possibility of such damages.

Solely You are responsible for determining the appropriateness of using the Software
and accept full responsibility for all risks associated with its exercise of rights
under this agreement, including but not limited to the risks and costs of program
errors, compliance with applicable laws, damage to or loss of data, programs or equipment,
and unavailability or interruption of operations.

You acknowledge, that it is in the nature of software that software is complex and
not completely free of errors.

If the foregoing limitations are prohibited by Your country's law or by the country's
law where the Software should be used, the Software must not be used!


6. Disclaimer of damages

In no event shall Style Campaign or any third-party-developer be liable to You under any theory
for any damages suffered by You or any user of the Software or for any special, incidental,
indirect, consequential or similar damages (including without limitation damages for
loss of business profits, business interruption, loss of business information or any
other pecuniary loss) arising out of the use or inability to use the Software, even if
Style Campaign has been advised of the possibility of such damages and regardless of the legal
or equitable theory (contract, tort or otherwise) upon which the claim is based.

The Software has been created using technologies that are not fault tolerant and thus
the Software is not designed, manufactured, or intended for use in hazardous environments
including, but without limitation, in the operation of nuclear facilities, aircraft
navigation or communication systems, air traffic control, direct life support machines,
or weapons systems, in which the failure of the technologies employed in the Software
could lead directly to death, personal injury, severe physical, environmental or
monetary damage.


7. Termination

This agreement is affected until terminated. You may terminate this agreement at
any time. This agreement will terminate immediately without notice from Style Campaign
if You fail to comply with the terms and conditions of this agreement. Upon termination,
You must delete the Software and all copies of the Software.

You agree that upon termination of this agreement for any reason, Style Campaign may take actions
so that the Software no longer operates.


8. Governing law

This agreement will be governed by the laws of the State of California and applicable United States
federal law. You agree that exclusive venue for all litigation regarding this Agreement shall be in
Los Angeles County, California, and You agree to submit to the jurisdiction of the federal and state
courts in Los Angeles County, California, for any such litigation.


9. Severability
If any provision of this agreement is held to be unenforceable, this agreement will remain
in effect with the provision omitted, unless omission would frustrate the intent of the
parties, in which case this agreement will immediately terminate.


10. Reservation of rights

All rights not expressly granted in this agreement are reserved by Style Campaign. Style
Campaign reserves the right at any time to cease the support of Style Campaign and to alter
prices, features, specifications, capabilities, functions, licensing terms, release dates,
general availability or other characteristics of the Software.

Style Campaign, January 8, 2010
