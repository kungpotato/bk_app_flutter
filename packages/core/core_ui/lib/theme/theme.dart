import 'package:core_ui/tokens/theme/bitkub_base_color.g.dart';
import 'package:core_ui/tokens/theme/bitkub_padding.g.dart';
import 'package:flutter/material.dart';

class BkTheme extends ThemeExtension<BkTheme> {
  final bitkubPadding = BitkubPadding();
  final bitkubBaseColor = BitkubBaseColor();

  @override
  ThemeExtension<BkTheme> copyWith() {
    // TODO: implement copyWith
    throw UnimplementedError();
  }

  @override
  ThemeExtension<BkTheme> lerp(
    covariant ThemeExtension<BkTheme>? other,
    double t,
  ) {
    // TODO: implement lerp
    throw UnimplementedError();
  }
}
