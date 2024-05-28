import 'package:core_dependencies/riverpod.dart';
import 'package:core_ui/core_ui.dart';
import 'package:core_ui/tokens/theme/bitkub_base_color.g.dart';
import 'package:core_ui/tokens/theme/bitkub_dark_color.g.dart';

final rightThemeProvider = Provider<BkTheme>((ref) {
  return BkTheme(bkColor: BitkubBaseColor());
});

final darkThemeProvider = Provider<BkTheme>((ref) {
  return BkTheme(bkColor: BitkubDarkColor());
});
